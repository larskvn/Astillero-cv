from mongoengine import Document, StringField, EmailField, ListField, EmbeddedDocumentField, EmbeddedDocument, DateTimeField, IntField

class ExperienciaLaboral(EmbeddedDocument):
    compañia = StringField(required=True)
    fechaInicio = DateTimeField()
    fechaFin = DateTimeField()
    posicion = StringField()
    descripcion = StringField()

class Education(EmbeddedDocument):
    tipoEducacion = StringField()
    nombre = StringField()
    grado = StringField()
    ciclo = StringField()

class Curso(EmbeddedDocument):
    nombreCurso = StringField()
    nivel = StringField()

class Preguntas(EmbeddedDocument):
    experiencia = StringField()
    proyecto = StringField()   
    motivación = StringField()
    compromiso = StringField()  

class CVPerson(Document):
    name = StringField(required=True)
    last_name = StringField(required=True)
    profession = StringField()
    email = EmailField(required=True)
    telefono = IntField()
    softskill = ListField(StringField())
    hardSkill = ListField(StringField())
    explaboral = ListField(EmbeddedDocumentField(ExperienciaLaboral))
    perfilProfesion = StringField()
    education = ListField(EmbeddedDocumentField(Education))
    curso = ListField(EmbeddedDocumentField(Curso))
    preguntas =ListField(EmbeddedDocumentField(Preguntas))

    
  