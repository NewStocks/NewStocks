from flask import Flask, request, Response, stream_with_context
from flask_cors import CORS

import os
from dotenv import load_dotenv
from threading import Thread
from queue import Queue, Empty
from collections.abc import Generator
import re
import requests
from bs4 import BeautifulSoup as bs

import langchain
from langchain.callbacks.streaming_stdout import StreamingStdOutCallbackHandler
from langchain.callbacks import get_openai_callback
from langchain.chat_models import ChatOpenAI
from langchain.embeddings import OpenAIEmbeddings
from langchain.schema import Document
from langchain.chains import RetrievalQA 
from langchain.prompts import PromptTemplate
from langchain.retrievers.document_compressors import EmbeddingsFilter
from langchain.retrievers import ContextualCompressionRetriever
from langchain.vectorstores import FAISS, DocArrayInMemorySearch
from langchain.callbacks.base import BaseCallbackHandler


app = Flask(__name__)
CORS(app)


BASE_DIR = os.path.dirname(os.path.abspath(__file__))
load_dotenv(os.path.join(BASE_DIR, ".env"))

class QueueCallback(BaseCallbackHandler):
    """Callback handler for streaming LLM responses to a queue."""

    # https://gist.github.com/mortymike/70711b028311681e5f3c6511031d5d43

    def __init__(self, q):
        self.q = q

    def on_llm_new_token(self, token: str, **kwargs: any) -> None:
        self.q.put(token)

    def on_llm_end(self, *args, **kwargs: any) -> None:
        return self.q.empty()


@app.route("/", methods=["GET"])
def home():
    return "home"

def get_url(source):
    article_id_match = re.search(r'article_id=([0-9]+)', source)
    office_id_match = re.search(r'office_id=([0-9]+)', source)

    url = ""
    if article_id_match and office_id_match: 
        article_id = article_id_match.group(1)
        office_id = office_id_match.group(1)
        url = f'https://n.news.naver.com/mnews/article/{office_id}/{article_id}'
    
    return url 


def get_article(url):
    response = requests.get(url)
    article = {"title": "", "content": ""}
    if response.status_code == 200:
        page_content = response.text
        try:
            soup = bs(page_content, 'html.parser')
            title = soup.find('h2', id="title_area").get_text()
            article_content = soup.find('div', id='newsct_article').get_text().strip()
            article["title"] = title 
            article["content"] = article_content
        except:
            print("article 추출 실패") 

    return article 
 

@app.route("/chat", methods=["POST"])
def chat_endpoint() -> Response:

    api_key = os.getenv("OPENAI_API_KEY")
    
    data = request.json
    question = data.get("message")

    print("Received question: ", question)

    langchain.verbose = True
    print(api_key)

    embeddings = OpenAIEmbeddings(openai_api_key=api_key)
    db = FAISS.load_local("./faiss_news", embeddings=embeddings)
    embeddings_filter = EmbeddingsFilter(embeddings=embeddings, similarity_threshold=0.5)

    def make_db_article(query=question, embeddings=embeddings, db=db, embeddings_filter=embeddings_filter):
        docs = [] 
        similar_docs = db.similarity_search(query)
        for source_doc in similar_docs:
            source = source_doc.metadata['source']
            url = get_url(source)
            article = get_article(url)
            title = article["title"]
            content = article["content"]
            docs.append(Document(page_content=f"source:{url}\n{title}\n{content}", metadata={"source":source, "title": title}))
        
        db_article = DocArrayInMemorySearch.from_documents(docs, embeddings)

        return db_article
            

    def stream() -> Generator: 
        q = Queue() 
        job_done = object()

        db_article = make_db_article()
        prompt_template = """Use the following pieces of context to answer the question at the end. If you don't know the answer, just say that you don't know, don't try to make up an answer. Include the source of the document within the context in the answer in a url format.

        {context}

        Question: {question}
        Answer in Korean:"""
        PROMPT = PromptTemplate(
            template=prompt_template, input_variables=["context", "question"]
        )

        compression_retriever = ContextualCompressionRetriever(
            # embeddings_filter 설정
            base_compressor=embeddings_filter,
            # retriever 를 호출하여 검색쿼리와 유사한 텍스트를 찾음
            base_retriever=db_article.as_retriever(search_kwargs={"k":1})
            )

        # 모델 
        model = ChatOpenAI(
            streaming=True, 
            callbacks=[QueueCallback(q)], 
            model="gpt-3.5-turbo-16k", 
            temperature=0, 
            openai_api_key=api_key
        )

        chain = RetrievalQA.from_chain_type(
            llm=model,
            chain_type="stuff",
            retriever=compression_retriever,
            return_source_documents=False,
            verbose=True,
            chain_type_kwargs={"prompt": PROMPT}
            )

        # template = '역할: 너는 금융 전문가로, 전문적인 내용을 사용자가 이해하기 쉽게 풀어 설명하는 역할을 해. 잘 모르겠거나 답이 정확하지 않으면 지어내지 말고 잘 모르겠다고 해. 메시지: 만약 질문이 금융에 관한 내용이 아니라면, 너는 금융 관련 챗봇이므로 다른 분야의 질문에 대해서는 답할 수 없다고 안내해줘. 금융 관련 질문이라면, 질문에 적합한 답을 해줘. 답은 한국어로 해줘. {question}'

        # prompt = PromptTemplate(
        #     input_variables=["question"], 
        #     template=template 
        # )

        # chain = LLMChain(
        #     llm=model,
        #     prompt=prompt
        # )

        def task():
            chain({"query": question})
            q.put(job_done)
        
        t = Thread(target=task)
        t.start() 

        content = ""

        while True: 
            try:
                next_token = q.get(True, timeout=1)
                if next_token is job_done:
                    break
                content += next_token
                yield next_token
            except Empty:
                continue
        print(content)

    

    return Response(stream_with_context(stream()), content_type='text/plain')

if __name__ == '__main__':
    app.run(debug=False, host='0.0.0.0', port=8000)