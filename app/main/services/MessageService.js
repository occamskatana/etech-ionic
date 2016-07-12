(function(){
	angular
		.module('main')
		.service('MessageService', MessageService)

		function MessageService($firebaseArray) {
			var services = {};

			services.chat = function(){
				var ref = new Firebase('https://evolutiontech.firebaseio.com/residents/' + window.localStorage.id + '/chat')
				return $firebaseArray(ref)
			};

			return services;
		};

})();