'use strict';
angular.module('main', [
  'ionic',
  'ngCordova',
  'ui.router',
  'ui.rCalendar',
  'firebase'
  // TODO: load other modules selected during generation
])
.config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

  $ionicConfigProvider.tabs.position("bottom"); //Places them at the bottom for all OS
  $ionicConfigProvider.tabs.style("standard"); //Makes them all look the same across all OS

  // ROUTING with ui.router
  $urlRouterProvider.otherwise('/main/list');
  $stateProvider
    // this state is placed in the <ion-nav-view> in the index.html
    .state('main', {
      url: '/main',
      abstract: true,
      templateUrl: 'main/templates/tabs.html'
    })
      .state('main.list', {
        url: '/list',
        views: {
          'tab-list': {
            templateUrl: 'main/templates/list.html',
            controller: 'ListController'
          }
        }
      })
      .state('main.listDetail', {
        url: '/list/detail',
        views: {
          'tab-list': {
            templateUrl: 'main/templates/list-detail.html',
            // controller: 'SomeCtrl as ctrl'
          }
        }
      })
      .state('main.calendar', {
        url: '/calendar',
        views: {
          'tab-calendar': {
            templateUrl: 'main/templates/calendar.html',
            controller: 'ScheduleController'
          }
        }
      });
});
