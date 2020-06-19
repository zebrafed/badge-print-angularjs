'use strict';

angular
  .module('myApp.paper-badge', ['ngRoute'])
  .component('paperBadge', {
    templateUrl: 'paper-badges/paper-badge/paper-badge.html',
    controller: 'paper-badgeCtrl',
    bindings: {
      user: '<',
    },
  })
  .controller('paper-badgeCtrl', [
    '$scope',
    function ($scope) {
      angular.element(document).ready(function () {
        const un = $scope.$ctrl.user.un;
        const id = $scope.$ctrl.user.id;
        const qrdata = `zmwprox1://{id:"${id}",un:"${un}"}`;
        let canvas = document.getElementById(`canvas${id}`);
        QRCode.toCanvas(canvas, qrdata, { margin: 0 }, (error) => {
          if (error) {
            console.error(error);
          }
        });
      });
    },
  ]);
