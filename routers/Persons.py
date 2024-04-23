from flask import Blueprint, request, jsonify
from models.person import CVPerson
from models.person import CVPerson, ExperienciaLaboral, Education, Curso,Preguntas
from datetime import datetime


cv = Blueprint('Persons', __name__)


@cv.route('/cv', methods=['POST'])
def agregar_cv():
    data = request.json

    # Convertir las fechas de string a objetos de datetime
    for exp in data.get('explaboral', []):
        exp['fechaInicio'] = datetime.fromisoformat(exp['fechaInicio'])
        exp['fechaFin'] = datetime.fromisoformat(exp['fechaFin'])

    experiencias_laborales = [ExperienciaLaboral(**exp) for exp in data.get('explaboral', [])]
    educaciones = [Education(**edu) for edu in data.get('education', [])]
    cursos = [Curso(**curso) for curso in data.get('curso', [])]
    preguntas = [Preguntas(**preg) for preg in data.get('preguntas', [])]

    cv = CVPerson(
        name=data.get('name'),
        last_name=data.get('last_name'),
        profession=data.get('profession'),
        email=data.get('email'),
        telefono=data.get('telefono'),
        softskill=data.get('softskill', []),
        hardSkill=data.get('hardSkill', []),
        explaboral=experiencias_laborales,
        perfilProfesion=data.get('perfilProfesion'),
        education=educaciones,
        curso=cursos,
        preguntas=preguntas
    )

    cv.save()

    return jsonify({'message': 'CV agregado exitosamente'}), 201




CHATGPT_API_URL =  "https://chatgpt-42.p.rapidapi.com/gpt4"
HEADERS = {
    "content-type": "application/json",
	"X-RapidAPI-Key": "5564be6326msh22563037b1ce7f8p19837cjsna54a3ab13c30",
	"X-RapidAPI-Host": "chatgpt-42.p.rapidapi.com"
}


    

@cv.route('/cv', methods=['GET'])
def get_all_cv():
    cv_people = CVPerson.objects().to_json()
    return cv_people, 200


