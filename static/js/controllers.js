angular.module('app.controllers', [])

.controller('mainPageCtrl', function ($scope, MessageDatabase) {
	
	/*var database = '{"messages":['+
	'{"id":"0","message":"Default Message"}, {"id":"1","message":"Default Message"}]}';
	*/
	jsonObj = MessageDatabase.all();
	
	var message = "";

	$("#createNote").click(function(event){
		event.preventDefault();
		
		if($scope.message === "" || $scope.message === null){
			alert("Enter your message in the form.")
			return;
		}else{
			$scope.hide = true;
			$scope.show = true;

		    data = {userinput: MessageDatabase.addMessage($scope.message)}
		    console.log(data);
			$.get("/generateUrl", data, function(resbody) {
		        $("#serveroutput").val(resbody);
			});
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