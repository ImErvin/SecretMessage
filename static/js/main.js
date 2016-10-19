angular.module('app', ['ui.bootstrap']).controller('DropdownCtrl', function ($scope) {
	
	var database = '{"messages":['+
	'{"id":"0","message":"Default Message"}]}';

	jsonObj = JSON.parse(database);
	
	var message = "";
	var tempId = 0;

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
	
	function onClick(message){
		if(message === "" || message === null){
			alert("Enter your message in the form.")
		}else{

			do{
				tempId = Math.floor((Math.random() * 99999) + 10000);
			}while(checkId(tempId) === true);

			jsonObj['messages'].push({"id":""+tempId,"message":message});
			database = JSON.stringify(jsonObj);
			$scope.message = "";
		}

		console.log(database);
	}

	$scope.message = message;
	$scope.onClick = onClick;
});