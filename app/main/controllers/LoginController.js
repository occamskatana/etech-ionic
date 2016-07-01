(function(){
	angular
		.module('main')
		.controller('LoginController', LoginController)

		function LoginController(Auth, $scope, $state){
			$scope.credentials = {}

			$scope.login = function(){
				Auth.login($scope.credentials).then(function(user){
					console.log(user)
			 	}, function(error){
			 		alert(error.data.error);
			 	});
			}

			$scope.$on('devise:login', function(event, currentUser){
				window.localStorage.clear();
				window.localStorage.id = currentUser.id;
				window.localStorage.soberDate = currentUser.sober_date
				window.localStorage.name = currentUser.first_name + ' ' + currentUser.last_name
				$state.go('main.list')

			})

			$scope.$on('devise:new-session', function(event, currentUser){
				
			})

		}
})();