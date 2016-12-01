angular.module('app.controllers', [])
    /* Controllers parse in $scope and the factory MessageDatabase.
       $scope : allows data binding between AngularJS and HTML
       MessageDatabase : is the AngularJS factory. 

       **Note that words in between " " in the comments refer to sections in HTML*/

/* My mainPageCtrl, this is the controller used for my static pages (Root and About). */
.controller('mainPageCtrl', function($scope, MessageDatabase) {
    /* $scope variables */
    $scope.show = false;
    $scope.hide = false;
    $scope.empty = true;
    $scope.link = null;
    $scope.message = null;
    $scope.copy = true;
    $scope.gitHubProfile = null;

    /* Function to hide the "Create Message" and show the "Generate Link" in the index.htm */
    function showHide() {
        $scope.show = true;
        $scope.hide = true;
    }

    /* Function to notify user that the textbox in "Create Message" is empty (if its empty) */
    function empty() {
        $scope.empty = false;
    }

    /* Function to notify user that the link was copied in "Generate Link" */
    function copied() {
        $scope.copy = false;
    }

    /* Function to add a message using the textbox value in "Create Message". */
    function addMessage(message) {
        message = $scope.message;
        if (message === "" || message === null) {
            empty();
            return;
        } else {
            /* Call the addMessage function in factory "MessageDatabase" */
            $scope.link = MessageDatabase.addMessage(message);
            showHide();
        }
    }

    /* Function to populate the Modal in index and about */
    function getGit() {
        /* Call the getGitHubProfile function in "MessageDatabase" to return an object of 
           profile details */
        $scope.gitHubProfile = MessageDatabase.getGitHubProfile();

        /* Don't open the modal box if the ajax call was not processed correctly*/
        if ($scope.gitHubProfile.username == undefined) {

        } else {
            $('#githubButton').attr("data-toggle", "modal");
            $('#githubButton').attr("data-target", "#myModal");
        }
    }

    /* jQuery request to select and copy the contents of the Link Textbox in "Generate Link" */
    $('#linkId').focus(function() {
        this.select();
        document.execCommand('copy');
    });

    /* $scope variables set to functions above */
    $scope.addMessage = addMessage;
    $scope.getGit = getGit;
    $scope.copied = copied;
})

/* My templateCtrl, this is the controller used for my template pages (messageTemplate 
   and messageTemplateError). */
.controller('templateCtrl', function($scope, MessageDatabase) {
    /* Variables */
    var urlDelete = window.location + '/deleteMessage';
    var urlCypher = window.location + '/decypher';

    /* $scope variables */
    $scope.hide = false;
    $scope.show = false;
    $scope.decryptError = true;
    $scope.gitHubProfile = null;
    $scope.message = null;
    $scope.deleted = true;

    /* Function to delete the message from the database in "Error Decrypt Key" in messageTemplate */
    function deleteMessage() {
        MessageDatabase.deleteMessage(urlDelete);
        /* Notify the user that the message was deleted */
        $scope.deleted = false;
    }

    /* Function to allow a button to act as a link in "Error Decrypt Key" */
    function goHome() {
        window.location = '/';
    }

    /* Function to show the user the "Show the Decrypted Message" if the Decryption key is valid.
       Or to show the user the "Error Decrypt Key" if the key doesn't work */
    function showHide() {
        /* Sets the message value to the response of getDecypher function from "MessageDatabase" 
        factory */
        $scope.message = MessageDatabase.getDecypher(urlCypher);

        /* If the message decrypted okay, it will delete the Message from the database and
           print it out in a text box in "Show the Decrypted Message". Or else show the user 
           "Error Decrypt Key"*/
        if ($scope.message != "") {
            MessageDatabase.deleteMessage(urlDelete);
            $scope.hide = true;
            $scope.show = true;
        } else {
            $scope.hide = true;
            $scope.decryptError = false;
        }
    }

    /* Function to populate the Modal in index and about */
    function getGit() {
        /* Call the getGitHubProfile function in "MessageDatabase" to return an object of profile details */
        $scope.gitHubProfile = MessageDatabase.getGitHubProfile();

        /* Don't open the modal box if the ajax call was not processed correctly*/
        if ($scope.gitHubProfile.username == undefined) {

        } else {
            $('#githubButton').attr("data-toggle", "modal");
            $('#githubButton').attr("data-target", "#myModal");
        }
    }

    /* jQuery request to select the content in the textbox in "Show the Decrypted Message" */
    $('#selectText').focus(function() {
        $('#messageContent').select();
    });

    /* $scope variables set to functions above */
    $scope.deleteMessage = deleteMessage;
    $scope.showHide = showHide;
    $scope.goHome = goHome;
    $scope.getGit = getGit;
});