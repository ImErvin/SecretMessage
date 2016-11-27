angular.module('app.services', [])

.factory("MessageDatabase", function(){
  	var jsonObj = {
      _id: null,
      message: null
    }

    var link = "";

    function hashCode(){
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for( var i=0; i < 8; i++ )
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;
    }
    
  	function addMessage(message){
      jsonObj._id = "" + hashCode();
      jsonObj.message = ""+message;

      $.ajax({
              url: '/dbSave',
              type: 'POST',
              data: JSON.stringify(jsonObj),
              async: false,
              dataType: "json",
              contentType: "application/json",
              success: function (response) {
                link = response;
              },
              error: function(response){
                link = "There was an internal error. Please try again.";
              }
          });

      return link;
  	}

    function deleteMessage(url){
      $.ajax({
              url: url,
              type: 'GET',
              success: function(){
                console.log("Deleted");
              },
              error: function(){
                console.log("Error");
              }
      })
    }
	
    
    return {
    	addMessage: addMessage,
      deleteMessage: deleteMessage
    }
     
 });