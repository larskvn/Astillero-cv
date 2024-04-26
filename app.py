from flask import Flask
from routers.Persons import cv
from utils.db import initialize_database
app = Flask(__name__)

initialize_database()
app.register_blueprint(cv)