from flask import Flask
from mongoengine import connect
from dotenv import load_dotenv
import os
load_dotenv()
db=connect(host=os.getenv("BD_MONGO"))

