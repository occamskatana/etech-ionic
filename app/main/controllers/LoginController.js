(function(){
	angular
		.module('main')
		.controller('LoginController', LoginController)

		function LoginController($resource, $scope, $state, $window, $ionicPopup){
			$scope.credentials = {}

			$scope.loading;

			var errorCallback = function showPopup(error){
				var errorMessage = error.data.errors[0];
	 			var alertPopup = $ionicPopup.alert({
	 				title: 'There was a problem!',
	 				template: errorMessage
	 			});
	 			$scope.loading = false;
	 			console.log(error.data.errors[0])
	 		}
			 var loginSuccessCallback = function(response){
					var user = response.data
					$window.localStorage.id = user.id;
					$window.localStorage.email = user.uid;
					$window.localStorage.name = user.first_name + ' ' + user.last_name;
					$window.localStorage.soberDate = user.sober_date;
					console.log(response);
					$state.go('main.list');
				};

			$scope.$on('$ionicView.loaded', function(){
				$scope.loading = false;
			});

			$scope.login = function(){
				$scope.loading = true;
				var UserSession = $resource('https://frozen-reaches-83397.herokuapp.com//api/v1/resident_auth/sign_in');
				var session = new UserSession($scope.credentials);
				session.$save(function(data){loginSuccessCallback(data)}, function(err){errorCallback(err)})
			};

			

		};
})();