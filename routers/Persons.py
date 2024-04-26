from flask import Blueprint, request, jsonify
from models.person import Persona, Educ, Laboral, Estudio
from datetime import datetime

from utils.db import save_to_database, improve_description, send_to_chatgpt
cv = Blueprint('Persons', __name__)

@cv.route('/prueba', methods=['POST'])
def prueba():
    data = request.json
    if not all(field in data for field in ['name', 'last_name', 'Experience', 'hard', 'skills', 'curso']):
        return jsonify({'error': 'Missing required fields'}), 400

    name_question = data['name']
    last_name_question = data['last_name']
    application_position_question = data.get('application_position', '')  # Establece un valor predeterminado
    hard_question = data['hard']
    skills_question = data['skills']
    curso_data = data['curso']

    curso_objects = [Estudio(**curso) for curso in curso_data]

    improved_descriptions = []

    for experiencia in data['Experience']:
        descripcion = improve_description(experiencia['descripcionLaboral'])
        improved_descriptions.append(descripcion)

    for experiencia, descripcion in zip(data['Experience'], improved_descriptions):
        experiencia['descripcionLaboral'] = descripcion

    sorted_experience = sorted(data['Experience'], key=lambda x: x['feFinal'], reverse=True)

    combined_question = f"Mi nombre es {name_question}.{last_name_question} y estoy postulando para {application_position_question}. {skills_question}. {hard_question}."
    about_response = send_to_chatgpt(name_question, last_name_question, combined_question, skills_question,
                                     hard_question, application_position_question)

    # Eliminar las comillas dobles que rodean la respuesta "Acerca de"
    about_response = about_response.strip('"')

    # Obtener los datos de educación de la solicitud JSON
    educacion_data = data.get('Educacion', [])

    user_data = {
        'name': name_question,
        'last_name': last_name_question,
        'application_position': application_position_question,
        'hard': hard_question,
        'skills': skills_question,
        'curso': curso_data,
        'about_response': about_response,
        'Experience': sorted_experience,
        'Educacion': educacion_data,
        'email': data.get('email', ''),  # Establece un valor predeterminado
        'phone': data.get('phone', ''),  # Establece un valor predeterminado
        'linkGit': data.get('linkGit', '')  # Establece un valor predeterminado
    }

    # Convertir las fechas de cadena a objetos datetime para cada experiencia educativa
    for educacion in user_data['Educacion']:
        educacion['fecha_inicial'] = datetime.strptime(educacion['fecha_inicial'], '%Y-%m-%dT%H:%M:%S') if educacion.get('fecha_inicial') else None
        educacion['fecha_final'] = datetime.strptime(educacion['fecha_final'], '%Y-%m-%dT%H:%M:%S') if educacion.get('fecha_final') else None

    # Guardar los datos del usuario en la base de datos
    user_id = save_to_database(user_data)

    # Construir la respuesta JSON con toda la información
    response_data = {
        'user_id': user_id,
        'name': name_question,
        'last_name': last_name_question,
        'application_position': application_position_question,
        'email': data.get('email', ''),  # Establece un valor predeterminado
        'phone': data.get('phone', ''),  # Establece un valor predeterminado
        'linkGit': data.get('linkGit', ''),  # Establece un valor predeterminado
        'Educacion': [
            {
                'tipoEducacion': edu.get('tipoEducacion', ''),
                'nameEdu': edu.get('nameEdu', ''),
                'fecha_inicial': edu.get('fecha_inicial').isoformat() if edu.get('fecha_inicial') else None,
                'fecha_final': edu.get('fecha_final').isoformat() if edu.get('fecha_final') else None,
                'grado': edu.get('grado', '')
            }
            for edu in user_data['Educacion']
        ],
        'Experience': sorted_experience,
        'hard': hard_question,
        'skills': skills_question,
        'curso': curso_data,
        'about_response': about_response
    }

    return jsonify(response_data)
