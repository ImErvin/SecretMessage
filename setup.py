import couchdb

couch = couchdb.Server("http://127.0.0.1:5984")
couch.create('secretmessage')

db = couch['secretmessage']

doc = {'_id':'TESMEST','message':'This is a sample message that is stored once the setup.py file is run.'}

db.save(doc)