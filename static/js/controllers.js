angular.module('app.controllers', [])

.controller('mainPageCtrl', function ($scope, MessageDatabase) {
	
	/*var database = '{"messages":['+
	'{"id":"0","message":"Default Message"}, {"id":"1","message":"Default Message"}]}';
	*/
	jsonObj = MessageDatabase.all();
	
	var message = "";
	var test = "";

	$("#createNote").click(function(event){
		event.preventDefault();
		
		if($scope.message === "" || $scope.message === null){
			alert("Enter your message in the form.")
			return;
		}else{
			$scope.hide = true;
			$scope.show = true;

            data = MessageDatabase.addMessage($scope.message);

			//console.log(data);

			$.ajax({
	            url: '/dbSave',
	            type: 'POST',
	            data: JSON.stringify(data),
	            async: true,
	            dataType: "json",
	            contentType: "application/json",
	            success: function (response) {
	            	$("#serveroutput").val(response);
	            },
	            error: function(response){
					alert("There was an internal error. Please re-try.");
	            }
	        });

	        /*$.ajax({
	            url: '/dbSave',
	            type: 'GET',
	            data: JSON.stringify(data),
	            dataType: "json",
	            contentType: "application/json",
	            success: function (response) {
	            	test = response.responseText;
	            }
	        });*/

	        console.log(JSON.stringify(test));
		}
	});

	$scope.message = message;
})

.controller('templateCtrl', function($scope, MessageDatabase){

	jsonObj = MessageDatabase.all();

	//$.get("/"+)

	/*$.get("/message/125").then(function(r) {
                    results = r.myVar;
                    alert(r.myVar); //verify your response data
               	});*/
    //console.log({{messageId}});

});