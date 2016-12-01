#Import couchdb plugin
import couchdb

#Set the couchdb server to the local host and couchdb port
couch = couchdb.Server("http://127.0.0.1:5984")
#create a database called 'secretmessage'
couch.create('secretmessage')