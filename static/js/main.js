angular.module('app', ['ui.bootstrap']).controller('DropdownCtrl', function ($scope) {
	$scope.myAlert = "Hey";
	
	function onClick(){
		alert($scope.message);
	}

	$scope.message = "";

	$scope.onClick = onClick;
});