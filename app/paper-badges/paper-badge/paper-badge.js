'use strict';

angular.module('myApp.paper-badge', ['ngRoute'])

// .config(['$routeProvider', function($routeProvider) {
//   $routeProvider.when('/paper-badge', {
//     templateUrl: 'paper-badge/paper-badge.html',
//     controller: 'paper-badgeCtrl'
//   });
// }])
.component("paperBadge", {
  templateUrl:'paper-badges/paper-badge/paper-badge.html',
  controller: 'paper-badgeCtrl'
})
.controller('paper-badgeCtrl', [function() {
  
}]);