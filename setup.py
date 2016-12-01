import couchdb

couch = couchdb.Server("http://127.0.0.1:5984")
couch.create('secretmessage')

db = couch['secretmessage']