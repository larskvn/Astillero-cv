from flask import Flask
import requests
from mongoengine import connect
from models.person import Persona, Educ, Laboral, Estudio
from datetime import datetime
from mongoengine import ValidationError
from dotenv import load_dotenv
import os
load_dotenv()



CHATGPT_API_URL =  "https://chatgpt-42.p.rapidapi.com/gpt4"
HEADERS = {
    "content-type": "application/json",
	"X-RapidAPI-Key": "7b297f7f6emsh85e9beeeaa6da4cp148cbajsn9b72e135eb04",
	"X-RapidAPI-Host": "chatgpt-42.p.rapidapi.com"
}

def initialize_database():
    db = connect(host=os.getenv("BD_MONGO"))



def save_to_database(user_data):
    try:
        experiences = [Laboral(**exp) for exp in user_data['Experience']]
        education = []  

        persona = Persona(
            name=user_data.get('name'),
            last_name=user_data.get('last_name'),
            aplication_position=user_data.get('aplication_position'),
            email=user_data.get('email'),
            phone=user_data.get('phone'),
            linkGit=user_data.get('linkGit'),
            Educacion=education,
            Experience=experiences,
            hard=user_data.get('hard', []),
            soft=user_data.get('soft', []),
            curso=[Estudio(**curso) for curso in user_data.get('curso', [])],
            about_response=user_data.get('about_response')
        )

        persona.save()

        return str(persona.id)
    except ValidationError as ve:
        return str(ve)
    except Exception as e:
        return str(e)

    
    
def send_to_chatgpt(name_question, last_name_question, experience_question, soft_question, hard_question,
                    application_position_question):
    combined_question = f"Mi nombre es {name_question}.{last_name_question} + y estoy postulando para {application_position_question}.{experience_question}. {soft_question}.{hard_question}"

    payload = {
        "messages": [
            {"role": "user", "content": combined_question},
            {"role": "user",
             "content": "creame un about apartir de la " + combined_question + "para un sobre mi para un cv ats, en español"}
        ],
        "system_prompt": "creame un sobre mi para mi cv tipo ats, con la informacion de " + combined_question + " para lograr una mejor informacion, pero no debe pasar mas de 250 token",
        "temperature": 0.9,
        "top_k": 5,
        "top_p": 0.9,
        "max_tokens": 256,
        "web_access": True,
        "model": "es-GPT4"
    }

    try:
        response = requests.post(CHATGPT_API_URL, json=payload, headers=HEADERS)
        response.raise_for_status()
        result = response.json()['result']

        about_response = result.split(":")[1].strip().replace('\n', ' ')

        return about_response
    except requests.RequestException as e:
        return str(e)


def improve_description(description):
    payload = {
        "messages": [
            {"role": "user", "content": description},
            {"role": "user", "content": "Mejora esta descripción laboral para mi CV, en español"}
        ],
        "system_prompt": "Mejora esta descripción laboral para mi CV, en español",
        "temperature": 0.9,
        "top_k": 5,
        "top_p": 0.9,
        "max_tokens": 256,
        "web_access": True,
        "model": "es-GPT4"
    }

    try:
        response = requests.post(CHATGPT_API_URL, json=payload, headers=HEADERS)
        response.raise_for_status()
        result = response.json()['result']

        improved_description = result.split(":")[1].strip().replace('\n', ' ')

        return improved_description
    except requests.RequestException as e:
        return str(e)
