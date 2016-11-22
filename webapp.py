from flask import Flask 
from flask import request
from flask import render_template
from flask import json
import couchdb
from bson.json_util import dumps
import flask as flaskApp

app = Flask(__name__)
couch = couchdb.Server("http://127.0.0.1:5984")
db = couch['secretmessage']

@app.route('/') 
def root():
	return app.send_static_file('index.htm')

@app.route('/<messageId>', methods=['GET'])
def message(messageId):
    for id in db:
        if(id == messageId):
            doc = db[id]
    
    return render_template('messageTemplate.html', messageIdo = doc['message'])

@app.route('/generateUrl', methods=['GET'])
def generateUrl():
    
	url = flaskApp.request.values["userinput"]
	return 'http://127.0.0.1:5000/' + url

if __name__ == "__main__":  
    
    app.run()