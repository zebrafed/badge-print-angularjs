'use strict';

angular.module('myApp.paper-badges',  ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/paper-badges', {
    templateUrl: 'paper-badges/paper-badges.html',
    controller: 'paper-badgesCtrl'
  });
}])

.controller('paper-badgesCtrl', ['$scope','$location',  function($scope, $location) {
    var data = $location.search().data;
    $scope.data = JSON.parse(data);
    console.log($scope.data[0])
}]);