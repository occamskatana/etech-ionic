(function(){
	angular
		.module('main')
		.controller('ListController', ListController)

		function ListController($scope, LocationFactory, $http, $interval, Auth, $ionicActionSheet){

			function callatInterval(){
				LocationFactory.getLocation();
				console.log("ding")
			};

			$interval(callatInterval, 5000);
			$scope.loading = true;
			$scope.name;
			$scope.events = ['Attend a Meeting', 'Urine Test Today', 'Therapy at 4 PM', 'Case Manager Meeting at 3PM']
			

			var getUserInfo = function(){ 
				Auth.currentUser().then(function(user){
				$scope.name = user.first_name + ' ' + user.last_name
				$scope.loading = false;
				});
			};

			$scope.$on('$ionicView.loaded', function(){
				LocationFactory.getLocation();
				getUserInfo();
				upTime(window.localStorage.soberDate);
			});

			$scope.showSheet = function() {

			   // Show the action sheet
			   var hideSheet = $ionicActionSheet.show({
			     buttons: [
			       { text: 'Request Time Change' },
			       { text: 'Request Cancel' },
			       {text: 'Bitch at Case Manager'}
			     ],
			     titleText: 'Modify Event',
			     cancelText: 'Cancel',
			     cancel: function() {
			          // add cancel code..
			        },
			     buttonClicked: function(index) {
			       return true;
			     }
				   });
				 };
						

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
		  };
		};
})();