from flask import Flask #Import Flask
from flask import request #Import request to be able to request information from methods
from flask import render_template #Import render_template to allow django and jinja2 to pass variables into html
from flask import json #Import json to use json.loads and json.dumps
from flask import redirect #Import redirect to allow routes to redirect to anothe route
from flask import url_for #Import url_for to allow rendered templates see files in the static folder
import couchdb #Import couchdb to use couchdb
import requests #Import requests to use a get method
import flask as flaskApp #Name my flask

'''
    My Python routes synergize. Each route will be directly be linked with another.
    The Root will return my index.htm static file which will show the user the main page.
    From this page the javascript will query the other routes. My about route will return the
    about.html static file, this is just a simple about page and is linked with the every page as
    Each page contains a footer that will allow the user to directly move to the about route.

    The next main route is the dbSave. This route will save the json object arriving from the post and
    then generate a link using the id in the json object that arrived. This link will be used to then
    query the messageId/cipherkey route. MessageId is a variable passed from Python and cipherkey is client
    generated. A combination of the two will successfully decrypt the message. If the messageid does not exist
    due to invalid messageId or if the message has been already opened, The messageId/cipherkey route will query 
    the messageError route. If however the messageId does exist the template messageTemplate is generated.
    From this template we will query the routes messageId/cipherkey/decypher and messageId/cipherkey/deleteMessage.
    
    The messageId/cipherkey/decypher route is used to send in the decryption key to the javascript.
    The messageId/cipherkey/deleteMessage route is used to delete the message from the database upon opening the 
    message or if the decryption key is incorrect the user will offered the choice to delete it.

    By implementing this architecture, I achieved a structure that, on the back end will handle the routing and
    database queries and on the front end, handle the projects purpose of encrypting and decrypting and data processing/displaying. 
    I chose to do the encryption and decryption on the client side as I believe it's more secure, if the decryption key was
    passed in with the message to the database, anyone could query the database and return the encrypted message and the decryption
    key to match it. It also achieves a very minimal and easy to use user interface and allowed me to handle errors more effieciently.
'''

#set variable app to Flask
app = Flask(__name__)

#set variable couch to the Server of couch db.
couch = couchdb.Server("http://127.0.0.1:5984")
#set variable db to the database named "secretmessage".
db = couch['secretmessage']

#Root, returns static file: index.htm.
@app.route('/') 
def root():
	return app.send_static_file('index.htm')

#About route, returns static file: about.html.
@app.route('/about') 
def about():
    return app.send_static_file('about.html')

#messageId/cipherkey route, This is the route that gets called when the user pastes the generated link in the URL.
@app.route('/<messageId>/<cipherkey>', methods=['GET'])
def message(messageId, cipherkey):

    #Sets variable doc to null
    doc = None;

    #Loops through the DB and checks if the message ID in the URL matches the id of an object in the database.
    for id in db:
        if(id == messageId):
            #Sets variable doc to the document with the matching ID.
            doc = db[id]
    
    #If the message id does not match any in the database it will redirect you to the error route.
    if(doc == None):
        return redirect("/"+messageId+"/error")
    else:
        #Else it will render the messageTemplate.html page.
        return render_template('messageTemplate.html')

#messageId/cipherkey/decypher route, This is the route that gets the encrypted message and the decryption key from the URL.
@app.route('/<messageId>/<cipherkey>/decypher', methods=['GET'])
def decMessage(messageId, cipherkey):

    #Sets variavle doc to null
    doc = None;

    #Loops through the DB and checks if the message ID in the URL matches the id of an object in the database.
    for id in db:
        if(id == messageId):
            #Sets variable doc to the dictionary with the matching ID.
            doc = db[id]
            #Sets message to the 'message' part of the dictionary "DOC".
            message = doc['message']
            #Create dictionary obj, set the encryption message as 'message' and the decryption key in the url to 'cipherkey'.
            obj = {"message":message,"cipherkey":cipherkey}

    #If the doc isn't found, return an error object.
    if(doc == None):
        return json.dumps({"Error":"Error 404"})
    else:
        #Else return the encrypted message and the decryption key used by the user.
        return json.dumps(obj)

#messageId/cipherkey/delecteMessage route, This is the route that deletes the message from the database.
@app.route('/<messageId>/<cipherkey>/deleteMessage', methods=['GET'])
def deleteMessage(messageId, cipherkey):
    #Create boolean deleted to null.
    deleted = None;

    #Loops through the DB and checks if the message ID in the URL matches the id of an object in the database.
    for id in db:
        if(id == messageId):
            #Sets variable doc to the dictionary with the matching ID.
            doc = db[id]
            #Use db.delete method from couchDb to delete the document.
            db.delete(doc)
            #Set the variable to deleted to true.
            deleted = True

    #If/else to validate if the message has been deleted.
    if(deleted == True):
        print("Deleted")
        return "Deleted"
    else:
        print("Not Deleted")
        return "Not Found"

#messageId/error route, this is the error route. If the messageId doesnt exist in the database it will return the messageErrorTemplate.html
#and pass in the messageId.
@app.route('/<messageId>/error', methods=['GET'])
def messageError(messageId):
    return render_template('messageErrorTemplate.html', messageIdo = messageId)

#getGitHubProfile route, this route queries the github api using my profile to return a JSON object with my profile details.
@app.route('/getGitHubProfile')
def getGitHubProfile():

    #use requests.get to query the api, found this to be the easiest method of accomplishing what I wanted.
    response = requests.get("https://api.github.com/users/imervin")

    #set variable doc to the response text to filter out some details.
    doc = response.text

    #Return the variable doc.
    return doc

#dbSave route, this is the route that saves the encrypted message to the database and generates a link for that message.
@app.route('/dbSave', methods=['GET','POST'])
def dbSave():
    #Use flask.request.get_json() to retrieve the json being posted.
    doc = flaskApp.request.get_json()

    #Set variable url to localhost plus the doc['_id'] to enable users to query the essageId/cipherkey route above.
    url = json.dumps("http://127.0.0.1:5000/" + doc['_id'])

    #Use couchDbs db.save to save the json object retrieved from the post method.
    db.save(doc)

    #Return the URL object
    return url

#Main method.
if __name__ == "__main__":  
    #Run the app.
    app.run()