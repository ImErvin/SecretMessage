from flask import Flask 
from flask import request
from flask_cors import CORS, cross_origin

import flask as flaskApp

app = Flask(__name__)  
CORS(app)

@app.route('/') 
def root():
	return app.send_static_file('index.htm')

if __name__ == "__main__":     
	app.run()
