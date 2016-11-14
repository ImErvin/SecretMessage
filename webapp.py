from flask import Flask 
from flask import request
from flask import render_template
from flask import json
from flask_cors import CORS, cross_origin
from flask_pymongo import PyMongo
from bson.json_util import dumps
import flask as flaskApp

app = Flask(__name__)
mongo = PyMongo(app)
CORS(app)

@app.route('/') 
def root():
	return app.send_static_file('index.htm')

@app.route('/<messageId>', methods=['GET'])
def message(messageId):
    data = mongo.db.test.find()
    print(data)
    [doc for doc in data]
    print(doc)
    
    return render_template('messageTemplate.html', messageIdo = dumps(data))

@app.route('/generateUrl', methods=['GET'])
def generateUrl():
	url = flaskApp.request.values["userinput"]
	return 'http://127.0.0.1:5000/' + url

if __name__ == "__main__":     
	app.run()