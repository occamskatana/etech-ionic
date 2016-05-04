(function(){
	angular
		.module('main')
		.service('CalendarItems', CalendarItems)

		function CalendarItems($firebaseArray){
			var ref = new Firebase('https://e-tech.firebaseio.com/users/bdsimmons/events')

			_items = $firebaseArray(ref)

			return {
				items: _items
			}
		}
})()