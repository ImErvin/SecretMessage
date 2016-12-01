angular.module('app.services', [])

.factory("MessageDatabase", function(){
  	var jsonObj = {
      _id: null,
      message: null
    }
    var cipherkey = null;
    var link = "";
    var githubProfileJSON = "";
    var githubProfile = {
      username: null,
      name: null,
      avatarUrl: null,
      bio: null
    }

    function hashCode(){
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for( var i=0; i < 8; i++ )
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;
    }
    
    function encrypt(message, cipherkey){
        var encrypt = CryptoJS.AES.encrypt(message, cipherkey);

        return encrypt.toString();
    }

    function decrypt(message, cipherkey){
      var decrypt = CryptoJS.AES.decrypt(message, cipherkey);
      var failed = false;

      try{
        return decrypt.toString(CryptoJS.enc.Utf8);
      }catch(err){
        failed = true;
        console.log("Error Decrypting");
      }

      if(failed == true){
        return "";
      }else{
        return decrypt.toString(CryptoJS.enc.Utf8);
      }
    }

  	function addMessage(message){
      jsonObj._id = hashCode();
      cipherkey = hashCode();
      jsonObj.message = encrypt(message, cipherkey);

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

      return link + "/" + cipherkey;
  	}

    function getDecypher(url){
      var obj = null;
      var message = null;

      $.ajax({
              url: url,
              type: 'GET',
              async: false,
              success: function(response){
                obj = JSON.parse(response);
              },
              error: function(){
                console.log("Error");
              }
      })

      message = decrypt(obj.message, obj.cipherkey);
      return message;
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
	 
   function getGitHubProfile(){
      $.ajax({
              url: '/getGitHubProfile',
              type: 'GET',
              async: false,
              success: function(response){
                githubProfileJSON = JSON.parse(response);
              },
              error: function(){
                alert("There was an error retrieving GitHub Profile.")
              }
      })

      githubProfile.username = githubProfileJSON.login;
      githubProfile.name = githubProfileJSON.name;
      githubProfile.avatarUrl = githubProfileJSON.avatar_url;
      githubProfile.bio = githubProfileJSON.bio;
      console.log(githubProfile);
      return githubProfile;
   }
    
    return {
    	addMessage: addMessage,
      deleteMessage: deleteMessage,
      getGitHubProfile: getGitHubProfile,
      getDecypher: getDecypher
    }
     
 });