(function(){
	angular
		.module('main')
		.factory('LocationFactory', LocationFactory)

		function LocationFactory($cordovaGeolocation, $firebaseArray, ResidentService, $http){
			var services = {}
			var posOptions = {timeout: 10000, enableHighAccuracy: true}

			services.getLocation = function(){
				$cordovaGeolocation.getCurrentPosition(posOptions).then(function(position){					
					


					var reverseGeocode = function() {
						var promise = $http.get('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + position.coords.latitude + ',' + position.coords.longitude + '&key=AIzaSyARZ_-6Ch_LNnSmmzgXrC2jqH5J5vOV2lM', {withCredentials: false}).then(function(response){
							var formatted_address = response.data.results[0].formatted_address;
							ResidentService.locationFirebase().$add({latitude: position.coords.latitude, longitude: position.coords.longitude, address: formatted_address, time: Date.now() })
						})
					}

					
					reverseGeocode();

					
				})
			}

			return services
		}
})();