from fastapi import FastAPI, Request

from langchain.chat_models import ChatOpenAI
from langchain.embeddings import OpenAIEmbeddings
from langchain.schema.messages import AIMessage, HumanMessage, SystemMessage
from langchain.chains import LLMChain, ConversationalRetrievalChain
from langchain.prompts import PromptTemplate

app = FastAPI() 

@app.post("/chat")
async def chat_endpoint(request: Request):
    data = await request.json() 
    question = data.get("message")
    chat_history = data.get("history", [])

    print("Recieved question: ", question)

    model = ChatOpenAI(
        model="gpt-3.5-turbo-16k", 
        temperature=0
    )

    template = 'This is a template'

    prompt = PromptTemplate.from_template(template)

    chain = LLMChain(
        llm=model,
        prompt=prompt
    ) 
    
    return
