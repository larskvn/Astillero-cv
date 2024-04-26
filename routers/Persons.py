from flask import Blueprint, request, jsonify
from flask_cors import CORS
from models.person import Persona, Educ, Laboral, Estudio
from utils.db import save_to_database, improve_description, send_to_chatgpt

cv = Blueprint('Persons', __name__)
CORS(cv)

@cv.route('/prueba', methods=['POST'])
def prueba():
    data = request.json
    if not all(field in data for field in ['name', 'last_name', 'Experience', 'hard', 'soft', 'curso']):
        return jsonify({'error': 'Faltan campos requeridos'}), 400

    nombre = data['name']
    apellido = data['last_name']
    puesto_aplicacion = data.get('application_position', '')  
    habilidades_duras = data['hard']
    habilidades_suaves = data['soft']
    cursos_data = data['curso']

    cursos_objects = [Estudio(**curso) for curso in cursos_data]

    descripciones_mejoradas = []

    for experiencia in data['Experience']:
        descripcion = improve_description(experiencia['descripcionLaboral'])
        descripciones_mejoradas.append(descripcion)

    for experiencia, descripcion in zip(data['Experience'], descripciones_mejoradas):
        experiencia['descripcionLaboral'] = descripcion

    experiencia_ordenada = sorted(data['Experience'], key=lambda x: x['feFinal'], reverse=True)

    pregunta_combinada = f"Mi nombre es {nombre}.{apellido} y estoy postulando para {puesto_aplicacion}. {habilidades_suaves}. {habilidades_duras}."
    respuesta_acercade = send_to_chatgpt(nombre, apellido, pregunta_combinada, habilidades_suaves,
                                     habilidades_duras, puesto_aplicacion)

    # Eliminar las comillas dobles que rodean la respuesta "Acerca de"
    respuesta_acercade = respuesta_acercade.strip('"')

    # Obtener los datos de educación de la solicitud JSON
    educacion_data = data.get('Educacion', [])

    datos_usuario = {
        'name': nombre,
        'last_name': apellido,
        'application_position': puesto_aplicacion,
        'hard': habilidades_duras,
        'soft': habilidades_suaves,
        'curso': cursos_data,
        'about_response': respuesta_acercade,
        'Experience': experiencia_ordenada,
        'Educacion': educacion_data,
        'email': data.get('email', ''), 
        'phone': data.get('phone', ''),  
        'linkGit': data.get('linkGit', '')  
    }

    # No es necesario convertir fecha_inicial y fecha_final a objetos datetime

    # Guardar los datos del usuario en la base de datos
    user_id = save_to_database(datos_usuario)

    # Construir la respuesta JSON con toda la información
    respuesta_data = {
        'user_id': user_id,
        'name': nombre,
        'last_name': apellido,
        'application_position': puesto_aplicacion,
        'email': data.get('email', ''),  
        'phone': data.get('phone', ''),  
        'linkGit': data.get('linkGit', ''),  
        'Educacion': [
            {
                'tipoEducacion': edu.get('tipoEducacion', ''),
                'nameEdu': edu.get('nameEdu', ''),
                'fecha_inicial': edu.get('fecha_inicial', ''),
                'fecha_final': edu.get('fecha_final', ''),
                'grado': edu.get('grado', '')
            }
            for edu in datos_usuario['Educacion']
        ],
        'Experience': experiencia_ordenada,
        'hard': habilidades_duras,
        'soft': habilidades_suaves,
        'curso': cursos_data,
        'about_response': respuesta_acercade
    }

    return jsonify(respuesta_data)
