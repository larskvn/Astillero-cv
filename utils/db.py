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
	"X-RapidAPI-Key": "2af4cd510emsh0c667015922f22bp1470abjsn0232cf3aa0aa",
	"X-RapidAPI-Host": "chatgpt-42.p.rapidapi.com"
}

def initialize_database():
    db = connect(host=os.getenv("BD_MONGO"))



def save_to_database(user_data):
    try:
        # Convertir las fechas de cadena a objetos datetime para cada experiencia laboral
        for experiencia in user_data['Experience']:
            experiencia['feInicial'] = datetime.strptime(experiencia['feInicial'], '%Y-%m-%dT%H:%M:%S')
            experiencia['feFinal'] = datetime.strptime(experiencia['feFinal'], '%Y-%m-%dT%H:%M:%S')

        # Crear instancias de objetos Laboral para cada experiencia laboral
        experiences = [Laboral(**exp) for exp in user_data['Experience']]

        # Crear instancias de objetos Educ para cada experiencia educativa
        education = []  # Esto es una lista vacía, ya que no hay datos de educación en user_data

        # Crear instancia de Persona con los datos proporcionados
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
            skills=user_data.get('skills', []),
            curso=[Estudio(**curso) for curso in user_data.get('curso', [])],
            about_response=user_data.get('about_response')
        )

        # Guardar la instancia de Persona en la base de datos
        persona.save()

        return str(persona.id)
    except ValidationError as ve:
        # Capturar errores de validación de MongoEngine
        return str(ve)
    except Exception as e:
        # Capturar otros errores
        return str(e)
    
    
def send_to_chatgpt(name_question, last_name_question, experience_question, skills_question, hard_question,
                    application_position_question):
    combined_question = f"Mi nombre es {name_question}.{last_name_question} + y estoy postulando para {application_position_question}.{experience_question}. {skills_question}.{hard_question}"

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
