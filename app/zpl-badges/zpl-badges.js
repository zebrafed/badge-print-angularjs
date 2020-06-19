'use strict';

angular
  .module('myApp.zpl-badges', ['ngRoute'])

  .config([
    '$routeProvider',
    function ($routeProvider) {
      $routeProvider.when('/zpl-badges', {
        templateUrl: 'zpl-badges/zpl-badges.html',
        controller: 'zplBadgesCtrl',
      });
    },
  ])

  .controller('zplBadgesCtrl', [
    function () {
      console.log('Do stuff!');
    },
  ]);
