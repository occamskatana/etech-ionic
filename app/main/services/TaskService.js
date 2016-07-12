(function(){
	angular 
		.module('main')
		.factory('TaskService', TaskService)

		function TaskService($firebaseArray, $window){
			var services = {};
			
			services.taskList = function(){
				var ref = new Firebase('https://evolutiontech.firebaseio.com/residents/' + $window.localStorage.id + '/tasks');
				return $firebaseArray(ref);
			};

			return services
		}
})();