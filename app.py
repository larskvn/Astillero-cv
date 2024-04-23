from flask import Flask, jsonify
from routers.Persons import cv
from utils.db import db
app = Flask(__name__)


app.register_blueprint(cv)