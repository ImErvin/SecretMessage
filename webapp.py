from flask import Flask 
from flask import request
from flask import render_template
from flask import json
from flask import redirect
from flask import url_for
import couchdb
import requests
import flask as flaskApp

app = Flask(__name__)
couch = couchdb.Server("http://127.0.0.1:5984")
db = couch['secretmessage']

@app.route('/') 
def root():
	return app.send_static_file('index.htm')

@app.route('/<messageId>/<cipherkey>', methods=['GET'])
def message(messageId, cipherkey):

    doc = None;

    for id in db:
        if(id == messageId):
            doc = db[id]
    
    if(doc == None):
        return redirect("/"+messageId+"/error")
    else:
        return render_template('messageTemplate.html')

@app.route('/<messageId>/<cipherkey>/decypher', methods=['GET'])
def decMessage(messageId, cipherkey):

    doc = None;

    for id in db:
        if(id == messageId):
            doc = db[id]
            message = doc['message']
            obj = {"message":message,"cipherkey":cipherkey}

    if(doc == None):
        return "Error"
    else:
        return json.dumps(obj)


@app.route('/<messageId>/<cipherkey>/deleteMessage', methods=['GET'])
def deleteMessage(messageId, cipherkey):
    deleted = None;

    for id in db:
        if(id == messageId):
            doc = db[id]
            db.delete(doc)
            deleted = True

    if(deleted == True):
        print("Deleted")
        return "Deleted"
    else:
        print("Not Deleted")
        return "Not Found"


@app.route('/<messageId>/error', methods=['GET'])
def messageError(messageId):
    return render_template('messageErrorTemplate.html', messageIdo = messageId)

@app.route('/getGitHubProfile')
def getGitHubProfile():

    response = requests.get("https://api.github.com/users/imervin")

    doc = response.text

    return doc

@app.route('/dbSave', methods=['GET','POST'])
def dbSave():
    doc = flaskApp.request.get_json()

    url = json.dumps("http://127.0.0.1:5000/" + doc['_id'])

    db.save(doc)

    return url

if __name__ == "__main__":  
    
    app.run()