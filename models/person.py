from mongoengine import Document, StringField, ListField, EmailField, IntField, EmbeddedDocument, EmbeddedDocumentField, DateTimeField

class Estudio(EmbeddedDocument):
    nombreCurso = StringField()
    nivel = StringField()

class Educ(EmbeddedDocument):
    tipoEducacion = StringField()
    nameEdu = StringField()
    fecha_inicial = DateTimeField()
    fecha_final = DateTimeField()
    grado = StringField()

class Laboral(EmbeddedDocument):
    nameEmpresa = StringField()
    posicionEmp = StringField()
    feInicial = DateTimeField()
    feFinal = DateTimeField()
    descripcionLaboral = StringField()    

class Persona(Document):
    name = StringField(required=True)
    last_name = StringField(required=True)
    aplication_position = StringField()
    email = EmailField()
    phone = IntField()
    linkGit = StringField()
    Educacion = ListField(EmbeddedDocumentField(Educ))
    Experience = ListField(EmbeddedDocumentField(Laboral))
    hard = ListField(StringField())
    skills = ListField(StringField())
    curso = ListField(EmbeddedDocumentField(Estudio))
    about_response = StringField() 

