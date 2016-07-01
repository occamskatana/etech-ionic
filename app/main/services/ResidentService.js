(function(){
	angular
		.module('main')
		.factory('ResidentService', ResidentService)

		function ResidentService($firebaseArray){
			var services = {}
			
			services.locationFirebase = function(){
				var ref = new Firebase('https://evolutiontech.firebaseio.com/residents/' + window.localStorage.id + '/locations')
				return $firebaseArray(ref)
			}

			

			return services

		}
})();