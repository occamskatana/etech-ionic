(function(){
	angular
		.module('main')
		.controller('ListController', ListController)

		function ListController($scope, LocationFactory, $http, $interval){


			$http.get('http://localhost:3000/api/v1/residents/' + window.localStorage.id).then(function(response){
				console.log(response)
			})


			function callatInterval(){
				LocationFactory.getLocation()
			}

			$interval(callatInterval, 1200000)



			$scope.name = window.localStorage.name

			$scope.$on('$ionicView.loaded', function(){
				upTime(window.localStorage.soberDate)
			})
			

			//hell yeah ghetto function
		  function upTime(soberDate) {
		    now = new Date();
		    countTo = new Date(soberDate);
		    difference = (now - countTo);

		    days = Math.floor(difference / (60 * 60 * 1000 * 24) * 1);
		    hours = Math.floor((difference % (60 * 60 * 1000 * 24)) / (60 * 60 * 1000) * 1);
		    mins=Math.floor(((difference%(60*60*1000*24))%(60*60*1000))/(60*1000)*1);
		    secs=Math.floor((((difference%(60*60*1000*24))%(60*60*1000))%(60*1000))/1000*1);

		    document.getElementById('days').firstChild.nodeValue = days;
		    document.getElementById('hours').firstChild.nodeValue = hours;
		    document.getElementById('minutes').firstChild.nodeValue = mins;
		    document.getElementById('seconds').firstChild.nodeValue = secs;

		    clearTimeout(upTime.to);
		    upTime.to = setTimeout(function(){upTime(countTo); }, 1000);
		  }
		}
})();