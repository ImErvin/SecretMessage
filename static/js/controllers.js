angular.module('app.controllers', [])

.controller('mainPageCtrl', function ($scope, MessageDatabase) {

	$scope.show = false;
	$scope.hide = false;
	$scope.link = "";
	addMessage = MessageDatabase.addMessage;
	getGit = MessageDatabase.getGitHubProfile;
	$scope.message = "";
	$scope.copy = true;
	$scope.copied = copied;
	$scope.gitHubProfile = "";

	function showHide(){
		$scope.show = true;
		$scope.hide = true;
	}

	$scope.addMessage = function(message){
		message = $scope.message;
		if(message === "" || message === null){
			alert("Enter your message in the form.")
			return;
		}else{
			$scope.link = addMessage(message);
			showHide();
		}
	}

	$scope.getGit = function(){
		$scope.gitHubProfile = getGit();
	}

	function copied(){
		$scope.copy = false;
	}

	$('#linkId').focus(function(){
		this.select();
		document.execCommand('copy');
	});
})

.controller('templateCtrl', function($scope, MessageDatabase){
	$scope.hide = false;
	$scope.show = false;
	getGit = MessageDatabase.getGitHubProfile;
	var url = window.location + '/deleteMessage';
	$scope.gitHubProfile = "";

	$scope.getGit = function(){
		$scope.gitHubProfile = getGit();
	}

	function showHide(){
		MessageDatabase.deleteMessage(url);
		$scope.hide = true;
		$scope.show = true;
	}

	$scope.showHide = showHide;

	$('#selectText').focus(function(){
		$('#messageContent').select();
	});
});