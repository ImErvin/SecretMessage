angular.module('app.controllers', [])

.controller('mainPageCtrl', function ($scope, MessageDatabase) {

	$scope.show = false;
	$scope.hide = false;
	$scope.link = "";
	addMessage = MessageDatabase.addMessage;
	$scope.message = "";
	$scope.copied = true;

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

	function copied(){

	}

	$('#linkId').focus(function(){
		this.select();
		document.execCommand('copy');
	});
})

.controller('templateCtrl', function($scope, MessageDatabase){

});