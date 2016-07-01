(function(){
	angular
		.module('main')
		.controller('ListController', ListController)

		function ListController($scope, LocationFactory, $http, $interval, Auth){


			// $http.get('https://frozen-reaches-83397.herokuapp.com//api/v1/residents/' + window.localStorage.id).then(function(response){
			// 	console.log(response)
			// })


			function callatInterval(){
				LocationFactory.getLocation()
			};

			$interval(callatInterval, 10000);
			$scope.loading = true;

			$scope.name;
			

			var getUserInfo = function(){ 
				Auth.currentUser().then(function(user){
				$scope.name = user.first_name + ' ' + user.last_name
				$scope.loading = false;
				

				});
			};


			

			$scope.$on('$ionicView.loaded', function(){
				
				LocationFactory.getLocation()
				getUserInfo();
				upTime(window.localStorage.soberDate)
			});
			

			//hell yeah ghetto function
		  function upTime(soberDate) {
		    var now = new Date();
		    var countTo = new Date(soberDate);
		    var difference = (now - countTo);

		    var days = Math.floor(difference / (60 * 60 * 1000 * 24) * 1);
		    var hours = Math.floor((difference % (60 * 60 * 1000 * 24)) / (60 * 60 * 1000) * 1);
		    var mins=Math.floor(((difference%(60*60*1000*24))%(60*60*1000))/(60*1000)*1);
		    var secs=Math.floor((((difference%(60*60*1000*24))%(60*60*1000))%(60*1000))/1000*1);

		    document.getElementById('days').firstChild.nodeValue = days;
		    document.getElementById('hours').firstChild.nodeValue = hours;
		    document.getElementById('minutes').firstChild.nodeValue = mins;
		    document.getElementById('seconds').firstChild.nodeValue = secs;

		    clearTimeout(upTime.to);
		    upTime.to = setTimeout(function(){upTime(countTo); }, 1000);
		  }
		}
})();