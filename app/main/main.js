'use strict';
angular.module('main', [
  'ionic',
  'ngCordova',
  'ui.router',
  'ui.rCalendar',
  'firebase',
  'Devise',
  'ngResource'
])
.config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider, AuthProvider, $httpProvider) {
  

  //send credentials with every http request
  $httpProvider.defaults.withCredentials = true;


  $ionicConfigProvider.tabs.position("bottom"); //Places them at the bottom for all OS
  $ionicConfigProvider.tabs.style("standard"); //Makes them all look the same across all OS

  // ROUTING with ui.router
  $urlRouterProvider.otherwise('/login');
  $stateProvider
    // this state is placed in the <ion-nav-view> in the index.html
    .state('login', {
      url: '/login',
      templateUrl: 'main/templates/login.html',
      controller: 'LoginController',
      onEnter: function(){window.localStorage.clear()}
    })

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
      })
       .state('main.chat', {
        url: '/chat',
        views: {
          'tab-chat': {
            templateUrl: 'main/templates/chat.html',
            controller: 'ChatController'
          }
        }
      });
});
