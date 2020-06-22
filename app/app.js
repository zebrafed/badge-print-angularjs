'use strict';

// Declare app level module which depends on views, and core components
angular
  .module('myApp', ['ngRoute', 'myApp.paper-badges', 'myApp.paper-badge', 'myApp.zpl-badges', 'myApp.zpl-badge'])
  .config([
    '$locationProvider',
    '$routeProvider',
    function ($locationProvider, $routeProvider) {
      $locationProvider.hashPrefix('!');
      $routeProvider.otherwise({ redirectTo: '/paper-badges' });
    },
  ]);
