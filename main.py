from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware

import openai
import nest_asyncio 
import os
from dotenv import load_dotenv


import langchain
from langchain.chat_models import ChatOpenAI
from langchain.embeddings import OpenAIEmbeddings
from langchain.schema.messages import AIMessage, HumanMessage, SystemMessage
from langchain.chains import LLMChain, ConversationalRetrievalChain, RetrievalQAWithSourcesChain 
from langchain.prompts import PromptTemplate

from langchain.retrievers.web_research import WebResearchRetriever 
from langchain.vectorstores import Chroma 
from langchain.utilities import GoogleSearchAPIWrapper

nest_asyncio.apply()

app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True, 
    allow_methods=["*"],
    allow_headers=["*"]  
)

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
load_dotenv(os.path.join(BASE_DIR, ".env.development"))

@app.get("/")
def home():
    return "home"

@app.post("/chat")
async def chat_endpoint(request: Request):

    api_key = os.getenv("OPENAI_API_KEY")
    
    data = await request.json() 
    question = data.get("message")
    chat_history = data.get("history", [])

    print("Received question: ", question)

    langchain.verbose = True

    # 모델 
    model = ChatOpenAI(
        model="gpt-3.5-turbo-16k", 
        temperature=0, 
        openai_api_key=api_key
    )

    # 검색 위한 vectorstore
    # vectorstore = Chroma(embedding_function=OpenAIEmbeddings(), persist_directory="./chroma_db_oai")

    # # SearchAPIWrapper
    # search = GoogleSearchAPIWrapper()

    # web_research_retriever = WebResearchRetriever.from_llm(vectorstore=vectorstore, llm=model, search=search)
    # qa_chain = RetrievalQAWithSourcesChain.from_chain_type(model, retriever=web_research_retriever)

    template = '다음 질문에 대해서 친절하게 답해줘. 잘 모르겠거나 답이 정확하지 않으면 지어내지 말고 잘 모르겠다고 말해줘. 답은 한국어로 해줘. ### 질문: {question}'

    prompt = PromptTemplate(
        input_variables=["question"], 
        template=template 
    )

    chain = LLMChain(
        llm=model,
        prompt=prompt
    )

    answer = chain.run(question)
    # answer = qa_chain({'question': question})
    print(answer) 
    
    return {'answer': answer}
