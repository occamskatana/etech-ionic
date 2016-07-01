(function(){
	angular
		.module('main')
		.controller('LoginController', LoginController)

		function LoginController(Auth, $scope, $state){
			$scope.credentials = {}

			$scope.login = function(){
				Auth.login($scope.credentials).then(function(user){
	
			 	}, function(error){
			 		alert(error.data.error);
			 	});
			};

			$scope.$on('devise:login', function(event, currentUser){
				window.localStorage.clear();
				window.localStorage.soberDate = currentUser.sober_date;
				window.localStorage.id = currentUser.id
				$state.go('main.list');

			});

			$scope.$on('devise:new-session', function(event, currentUser){
				window.localStorage.soberDate = currentUser.sober_date
			});

		};
})();