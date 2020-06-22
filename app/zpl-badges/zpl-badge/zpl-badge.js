'use strict';

angular
  .module('myApp.zpl-badge', ['ngRoute'])
  .component('zplBadge', {
    templateUrl: 'zpl-badges/zpl-badge/zpl-badge.html',
    controller: 'zpl-badgeCtrl',
    bindings: {
      data: '<',
    },
  })
  .controller('zpl-badgeCtrl', [
    '$scope',
    function ($scope) {
      function findPrinters() {
        const defaultPromise = new Promise((resolve, reject) => {
          BrowserPrint.getDefaultDevice('printer', (device) => {
            device ? resolve(device) : reject;
          });
        });

        const localPromise = new Promise((resolve, reject) => {
          BrowserPrint.getDefaultDevice(
            BrowserPrint.getLocalDevices(
              (list) => {
                resolve(list);
              },
              () => reject,
              'printer'
            )
          );
        });

        Promise.all([defaultPromise, localPromise])
          .then((val) => {
            if (val[1]) {
              $scope.$ctrl.printers = val[1];
            }
            if (val[0][name]) {
              $scope.$ctrl.printers.push(val[0]);
            }
            setCanPrint();
          })
          .catch((e) => {
            console.error(e);
          });
      }
      function setCanPrint() {
        console.log($scope.$ctrl.printers.length);
      }
      angular.element(document).ready(function () {
        findPrinters();
      });
    },
  ]);
