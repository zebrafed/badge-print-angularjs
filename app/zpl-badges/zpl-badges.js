'use strict';

angular
  .module('myApp.zpl-badges', ['ngRoute'])

  .config([
    '$routeProvider',
    function ($routeProvider) {
      $routeProvider.when('/zpl-badges', {
        templateUrl: 'zpl-badges/zpl-badges.html',
        controller: 'zpl-badgesCtrl',
      });
    },
  ])

  .controller('zpl-badgesCtrl', [
    '$scope',
    '$location',
    function ($scope, $location) {
      var data = $location.search().data ? JSON.parse($location.search().data) : [];
      $scope.data = data;
    },
  ]);

// http://localhost:8000/#!/zpl-badges?data=%5B%7B%22id%22:%221234%22,%22un%22:%22Ben%22%7D%5D
// http://localhost:8000/#!/zpl-badges?data=[{"un":"mike", "id":"8374858"}, {"un":"jamie", "id":"i84758"}, {"un":"louis", "id":"234435"}]