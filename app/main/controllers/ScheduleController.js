(function(){
	angular
		.module('main')
		.controller('ScheduleController', ScheduleController)

		function ScheduleController($scope, $firebaseArray, CalendarItems) {
			
    			'use strict';

            var ref = new Firebase('https://evolutiontech.firebaseio.com/residents/'+ window.localStorage.id +'/calendar')

            $scope.calendar = {};
            $scope.calendar.eventSource = $firebaseArray(ref)

            console.log($scope.calendar.eventSource)

            $scope.calendar.eventSource.$watch(function(event){
                $scope.$broadcast('eventSourceChanged',$scope.calendar.eventSource);
            })

            
            $scope.changeMode = function (mode) {
                $scope.calendar.mode = mode;
            };

            $scope.onEventSelected = function (event) {
                console.log('Event selected:' + event.startTime + '-' + event.endTime + ',' + event.title);
            };

            $scope.onViewTitleChanged = function (title) {
                $scope.viewTitle = title;
            };

            $scope.today = function () {
                $scope.calendar.currentDate = new Date();
            };

            $scope.isToday = function () {
                var today = new Date(),
                    currentCalendarDate = new Date($scope.calendar.currentDate);

                today.setHours(0, 0, 0, 0);
                currentCalendarDate.setHours(0, 0, 0, 0);
                return today.getTime() === currentCalendarDate.getTime();
            };

            $scope.onTimeSelected = function (selectedTime) {
                console.log('Selected time: ' + selectedTime);
            };


            // Function to seed random events

            //  function createRandomEvents() {
            //     var events = [];
            //     for (var i = 0; i < 50; i += 1) {
            //         var date = new Date();
            //         var eventType = Math.floor(Math.random() * 2);
            //         var startDay = Math.floor(Math.random() * 90) - 45;
            //         var endDay = Math.floor(Math.random() * 2) + startDay;
            //         var startTime;
            //         var endTime;
            //         if (eventType === 0) {
            //             startTime = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate() + startDay));
            //             if (endDay === startDay) {
            //                 endDay += 1;
            //             }
            //             endTime = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate() + endDay));
            //             events.push({
            //                 title: 'All Day - ' + i,
            //                 start: startTime,
            //                 endTime: endTime,
            //                 allDay: true
            //             });
            //         } else {
            //             var startMinute = Math.floor(Math.random() * 24 * 60);
            //             var endMinute = Math.floor(Math.random() * 180) + startMinute;
            //             startTime = new Date(date.getFullYear(), date.getMonth(), date.getDate() + startDay, 0, date.getMinutes() + startMinute);
            //             endTime = new Date(date.getFullYear(), date.getMonth(), date.getDate() + endDay, 0, date.getMinutes() + endMinute);
            //             events.push({
            //                 title: 'Event - ' + i,
            //                 startTime: startTime,
            //                 endTime: endTime,
            //                 allDay: false
            //             });
            //         }
            //     }
            //     return events;
            // }

		}
})();