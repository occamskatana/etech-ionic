(function(){
	angular
		.module('main')
		.controller('LoginController', LoginController)

		function LoginController(Auth, $scope, $state, $window, $ionicPopup){
			$scope.credentials = {}

			$scope.loading;


			$scope.$on('$ionicView.loaded', function(){
				$scope.loading = false;
			});

			$scope.login = function(){
				Auth.login($scope.credentials).then(function(user){
					$scope.loading = true;
			 	}, function(error){
			 		(function showPopup(){
			 			var alertPopup = $ionicPopup.alert({
			 				title: 'There was a problem!',
			 				template: error.data.error
			 			});
			 		})();
			 	});
			};

			$scope.$on('devise:login', function(event, currentUser){
				$window.localStorage.clear();
				window.localStorage.soberDate = currentUser.sober_date
				window.localStorage.id = currentUser.id
				console.log(currentUser)
			});

			$scope.$on('devise:new-session', function(event, currentUser){
				
				$state.go('main.list');
			});

		};
})();