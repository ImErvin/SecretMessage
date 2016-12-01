angular.module('app.services', [])

.factory("MessageDatabase", function() {
    /* I used jQueries AJAX calls to query the Flask routes. I ran into an issue attempting to use angulars $http calls
       , where due to asynchronous calls the data wasn't being set so I used AJAX with async: false to work around it. 
       I saw the .done() useage for $http after I had already used async: false */


    /* Object variables */
    var jsonObj = {
        _id: null,
        message: null
    }
    var githubProfile = {
        username: null,
        name: null,
        avatarUrl: null,
        bio: null
    }

    /* Variables */
    var cipherkey = null;
    var link = null;
    var githubProfileJSON = null;

    /* Function to create a character code */
    /* Adapted and modified http://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript */
    function hashCode() {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for (var i = 0; i < 8; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;
    }

    /* Function to encrypt the message */
    /* Adapted from CryptoJS */
    function encrypt(message, cipherkey) {
        var encrypt = CryptoJS.AES.encrypt(message, cipherkey);

        return encrypt.toString();
    }

    /*Function to decrypt the message, using a decryption key provided through Python */
    function decrypt(message, cipherkey) {
        var decrypt = CryptoJS.AES.decrypt(message, cipherkey);
        var failed = false;

        /* Try/catch to make validate the decryption code */
        try {
            return decrypt.toString(CryptoJS.enc.Utf8);
        } catch (err) {
            failed = true;
            console.log("Error Decrypting");
        }

        if (failed == true) {
            return "";
        } else {
            return decrypt.toString(CryptoJS.enc.Utf8);
        }
    }

    /* Function to add the message to the database using an AJAX post method */
    function addMessage(message) {
        jsonObj._id = hashCode();
        cipherkey = hashCode();
        jsonObj.message = encrypt(message, cipherkey);

        /* jQuery Ajax post to query the python to save the message to the database and get the link. */
        $.ajax({
            url: '/dbSave',
            type: 'POST',
            data: JSON.stringify(jsonObj),
            async: false,
            dataType: "json",
            contentType: "application/json",
            success: function(response) {
                link = response;
            },
            error: function(response) {
                link = "There was an internal error. Please try again.";
            }
        });

        /* Returns the link generated from Python and added client decryption key to the end of the URL */
        return link + "/" + cipherkey;
    }

    /* Function to pass in the Decryption key */
    function getDecypher(url) {
        var obj = null;
        var message = null;

        /* jQuery AJAX get method returns the encrypted message and the decryption key entered by user from Python */
        $.ajax({
            url: url,
            type: 'GET',
            async: false,
            success: function(response) {
                obj = JSON.parse(response);
            },
            error: function() {
                alert("An Error has Occurred! Try Again.");
            }
        })

        /* Attempt to decrypt the message using the decryption key the user entered */
        message = decrypt(obj.message, obj.cipherkey);
        return message;
    }

    /* Function to Delete the message from the database */
    function deleteMessage(url) {
        /* jQuery AJAX call to query the Python where it deletes the message from the database */
        $.ajax({
            url: url,
            type: 'GET',
            success: function() {
                console.log("Deleted");
            },
            error: function() {
                console.log("Error");
            }
        })
    }

    /* Function to get the github profile using the githubs API */
    function getGitHubProfile() {
        /* jQuery AJAX call to query the Python that returns the githubs API object for my profile */
        $.ajax({
            url: '/getGitHubProfile',
            type: 'GET',
            async: false,
            success: function(response) {
                githubProfileJSON = JSON.parse(response);
            },
            error: function() {
                alert("There was an error loading the GitHub API. Proceed to: https://github.com/imervin");
            }
        })

        /* set my local variable to the information passed and return it */
        githubProfile.username = githubProfileJSON.login;
        githubProfile.name = githubProfileJSON.name;
        githubProfile.avatarUrl = githubProfileJSON.avatar_url;
        githubProfile.bio = githubProfileJSON.bio;
        console.log(githubProfile);
        return githubProfile;
    }

    /* Factory returns functions to be used in controllers */
    return {
        addMessage: addMessage,
        deleteMessage: deleteMessage,
        getGitHubProfile: getGitHubProfile,
        getDecypher: getDecypher
    }

});