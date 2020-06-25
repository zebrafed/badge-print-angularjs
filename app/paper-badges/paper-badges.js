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
      try {
        $scope.data = JSON.parse(data);
      } catch (e) {
        if (!$scope.data) {
          $scope.data = [{ id: '', un: 'NO USERNAME' }];
        }
      }
    },
  ]);

// http://localhost:8000/#!/paper-badges?data=%5B%7B%22un%22:%22Person%201%22,%22id%22:%22id1%22%7D,%7B%22un%22:%22person%202%22,%22id%22:%22id2%22%7D,%7B%22un%22:%22person%203%22,%22id%22:%22id3%22%7D%5D
