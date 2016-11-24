from flask import Flask 
from flask import request
from flask import render_template
from flask import json
import couchdb
import flask as flaskApp

app = Flask(__name__)
couch = couchdb.Server("http://127.0.0.1:5984")
db = couch['secretmessage']

@app.route('/') 
def root():
	return app.send_static_file('index.htm')

@app.route('/<messageId>', methods=['GET','DELETE'])
def message(messageId):
    for id in db:
        if(id == messageId):
            doc = db[id]
            message = doc['message']
    
    db.delete(doc);

    return render_template('messageTemplate.html', messageIdo = message)


@app.route('/dbSave', methods=['GET','POST'])
def dbSave():
	#doc = flaskApp.request.values["userinput"]
    doc = flaskApp.request.get_json()

    url = json.dumps("http://127.0.0.1:5000/" + doc['_id'])

    db.save(doc)

    return url

if __name__ == "__main__":  
    
    app.run()