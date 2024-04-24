# Astillero CV

Astillero CV es una aplicación web desarrollada siguiendo el patrón de diseño Modelo-Vista-Controlador (MVC) utilizando tecnologías como Flask, MongoDB y el ORM MongoEngine. Este proyecto te permite crear y gestionar clases de manera eficiente y sencilla.

## Características

- **Patrón MVC**: Organiza tu código de manera estructurada, separando la lógica de negocio, la presentación y la interacción con la base de datos.
- **Flask**: Un microframework web en Python que proporciona herramientas para construir aplicaciones web rápidas y fáciles de mantener.
- **MongoDB**: Una base de datos NoSQL altamente escalable y flexible que se integra perfectamente con Flask.
- **MongoEngine**: Un ORM (Object-Document Mapper) para MongoDB que simplifica la interacción con la base de datos a través de modelos de datos orientados a objetos.

## Instalación

1. Clona este repositorio en tu máquina local:

    ```
    git clone https://github.com/tu_usuario/astillero-cv.git
    ```

2. Instala las dependencias utilizando pip:

    ```
    pip install -r requirements.txt
    ```

3. Configura tu entorno creando un archivo `.env` en el directorio raíz del proyecto y define las variables de entorno necesarias:

    ```
    FLASK_APP=app.py
    FLASK_ENV=development
    MONGODB_URI=tu_uri_de_conexión_a_MongoDB
    ```

4. Ejecuta la aplicación:

    ```
    flask run
    ```

## Uso


