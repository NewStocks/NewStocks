from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware

import openai 
import os
from dotenv import load_dotenv

from langchain.chat_models import ChatOpenAI
from langchain.embeddings import OpenAIEmbeddings
from langchain.schema.messages import AIMessage, HumanMessage, SystemMessage
from langchain.chains import LLMChain, ConversationalRetrievalChain
from langchain.prompts import PromptTemplate

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

    model = ChatOpenAI(
        model="gpt-3.5-turbo-16k", 
        temperature=0, 
        openai_api_key=api_key
    )

    template = 'Answer to this question in Korean: {question}'

    prompt = PromptTemplate(
        input_variables=["question"], 
        template=template 
    )

    chain = LLMChain(
        llm=model,
        prompt=prompt
    )

    answer = chain.run(question)
    print(answer) 
    
    return {'answer': answer}
