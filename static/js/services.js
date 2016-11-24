angular.module('app.services', [])

.factory("MessageDatabase", function(){
	var jsonObj = {
    _id: null,
    message: null
  }

	var message = "";
	var string = null;
    
    /* Implemented from http://werxltd.com/wp/2010/05/13/javascript-implementation-of-javas-string-hashcode-method/
       Allows the ability to create a hashcode for a message object and parse that into the id */
    /*String.prototype.hashCode = function() {
      var hash = 0, i, chr, len;
      if (this.length === 0) return hash;
      for (i = 0, len = this.length; i < len; i++) {
        chr   = this.charCodeAt(i);
        hash  = ((hash << Math.floor(Math.random()*10)) - hash) + chr;
        hash |= 0; // Convert to 32bit integer
      }

      if(hash < 0){
        return hash*-1;
      }else{
        return hash;
      }
    };*/

    function hashCode(){

        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for( var i=0; i < 5; i++ )
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        console.log(text);
        return text;
    }
    
	function addMessage(message){
		//jsonObj.push({"_id":""+message.hashCode(),"message":message});

    jsonObj._id = "" + hashCode();
    jsonObj.message = ""+message;

    console.log(jsonObj);

		console.log(JSON.stringify(jsonObj));

		return jsonObj;
	}
	
    
    return {
    	all: function(){
    		return jsonObj;
    	},
    	addMessage: addMessage
    }
     
 });