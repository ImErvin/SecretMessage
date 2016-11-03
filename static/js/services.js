angular.module('app.services', [])

.factory("MessageDatabase", function(){
	var database = '{"messages":['+
	'{"id":"0","message":"Default Message"}, {"id":"1","message":"Default Message"}]}';
    
  
	jsonObj = JSON.parse(database);

	var message = "";
	var tempId = 0;
	var string = null;

	function checkId(id){
		var found = false;

		for(i = 0; i < jsonObj.messages.length; i++){
				if(jsonObj.messages[i].id == id){
					found = true;
				}
				console.log(jsonObj.messages[i].id);
			}

		return found;
	}

	function addMessage(message){

		do{
			tempId = Math.floor((Math.random() * 99999) + 10000);
		}while(checkId(tempId) === true);

		jsonObj['messages'].push({"id":""+tempId,"message":message});
		

		console.log(jsonObj);

		return jsonObj.messages[jsonObj.messages.length - 1].id;
	}
	
    
    return {
    	all: function(){
    		return jsonObj;
    	},
    	addMessage: addMessage
    }
     
 });