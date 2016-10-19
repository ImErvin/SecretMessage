from flask import Flask 
from flask import request
from flask import render_template
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
if __name__ == "__main__":     
	app.run()
