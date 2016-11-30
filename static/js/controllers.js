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
		console.log($scope.gitHubProfile);
		if($scope.gitHubProfile == ""){

		}else{
			$('#githubButton').attr("data-toggle","modal");
			$('#githubButton').attr("data-target","#myModal");
		}
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
	$scope.decryptError = true;
	getGit = MessageDatabase.getGitHubProfile;
	var urlDelete = window.location + '/deleteMessage';
	var urlCypher = window.location + '/decypher';
	$scope.gitHubProfile = null;
	$scope.message = null;

	$scope.getGit = function(){
		$scope.gitHubProfile = getGit();
		console.log($scope.gitHubProfile);
		if($scope.gitHubProfile == ""){

		}else{
			$('#githubButton').attr("data-toggle","modal");
			$('#githubButton').attr("data-target","#myModal");
		}
	}

	function deleteMessage(){
		MessageDatabase.deleteMessage(urlDelete);
	}

	function showHide(){
		$scope.message = MessageDatabase.getDecypher(urlCypher);
		console.log($scope.message);
		if($scope.message != ""){
			MessageDatabase.deleteMessage(urlDelete);
			$scope.hide = true;
			$scope.show = true;
		}else{
			$scope.hide = true;
			$scope.decryptError = false;
		}
	}

	$scope.deleteMessage = deleteMessage;
	$scope.showHide = showHide;

	$('#selectText').focus(function(){
		$('#messageContent').select();
	});
});