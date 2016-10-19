from flask import Flask 
from flask import request
from flask import render_template
from flask import json
from flask_cors import CORS, cross_origin

import flask as flaskApp

app = Flask(__name__)  
CORS(app)

@app.route('/') 
def root():
	return app.send_static_file('index.htm')

@app.route('/<message>')
def message(message=None):
	return render_template('messageTemplate.html', message=message)

@app.route('/generateUrl', methods=['GET','POST'])
def generateUrl():
	url = flaskApp.request.values["userinput"]
	return 'http://127.0.0.1:5000/' + url

if __name__ == "__main__":     
	app.run()
