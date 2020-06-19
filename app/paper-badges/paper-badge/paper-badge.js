'use strict';

angular
  .module('myApp.paper-badge', ['ngRoute'])

  // .config(['$routeProvider', function($routeProvider) {
  //   $routeProvider.when('/paper-badge', {
  //     templateUrl: 'paper-badge/paper-badge.html',
  //     controller: 'paper-badgeCtrl'
  //   });
  // }])
  .component('paperBadge', {
    templateUrl: 'paper-badges/paper-badge/paper-badge.html',
    controller: 'paper-badgeCtrl',
    bindings: {
      user: '<',
    },
  })
  .controller('paper-badgeCtrl', [
    function () {
      const qrdata = `zmwprox1://{id:"1234","un":"Mike"}`;
      //TODO: make data change
      angular.element(document).ready(function () {
        let canvas = document.getElementById('canvasId');
        //TODO: generate custom canvas ID
        QRCode.toCanvas(canvas, qrdata, { margin: 0 }, (error) => {
          if (error) {
            console.error(error);
          }
        });
      });
    },
  ]);
// =======
//   // .config(['$routeProvider', function($routeProvider) {
//   //   $routeProvider.when('/paper-badge', {
//   //     templateUrl: 'paper-badge/paper-badge.html',
//   //     controller: 'paper-badgeCtrl'
//   //   });
//   // }])
//   .component('paperBadge', {
//     templateUrl: 'paper-badges/paper-badge/paper-badge.html',
//     controller: 'paper-badgeCtrl',
//   })
//   .controller('paper-badgeCtrl', [
//     function () {
//       const qrdata = `zmwprox1://{id:"1234","un":"Mike"}`;
//       //TODO: make data change
//       angular.element(document).ready(function () {
//         let canvas = document.getElementById('canvasId');
//         //TODO: generate custom canvas ID
//         QRCode.toCanvas(canvas, qrdata, { margin: 0 }, (error) => {
//           if (error) {
//             console.error(error);
//           }
//         });
//       });
//     },
//   ]);
// >>>>>>> Added QR codes to paper-badge
