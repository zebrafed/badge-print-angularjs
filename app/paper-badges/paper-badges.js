'use strict';

angular
  .module('myApp.paper-badges', ['ngRoute'])

  .config([
    '$routeProvider',
    function ($routeProvider) {
      $routeProvider.when('/paper-badges', {
        templateUrl: 'paper-badges/paper-badges.html',
        controller: 'paper-badgesCtrl',
      });
    },
  ])

  .controller('paper-badgesCtrl', [
    '$scope',
    '$location',
    function ($scope, $location) {
      var data = $location.search().data;
      $scope.data = JSON.parse(data);
    },
  ]);

// http://localhost:8000/#!/paper-badges?data=%5B%7B%22id%22:%221234%22,%22un%22:%22Ben%22%7D%5D
// http://localhost:8000/#!/paper-badges?data=[{"un":"ben","id":"123412341234"},{"un":"jamie","id":"0947739292"},{"un":"Louis","id":"lkajdsfhlaksjf"}]