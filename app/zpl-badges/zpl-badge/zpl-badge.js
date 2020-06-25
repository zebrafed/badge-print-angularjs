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
              $scope.printers = val[1];
            }
            if (val[0][name]) {
              $scope.printers.push(val[0]);
            }
            console.log(val);
            $scope.$apply();
          })
          .catch((e) => {
            console.error(e);
          });
      }

      function printBadges() {
        $scope.$ctrl.data.forEach((x) => {
          printBadge(x.un, x.id);
        });
      }

      function printBadge(un, id) {
        const dataToEncode = `zmwprox1://{id:"${id}",un:"${un}"}`;
        const qrSizeOffset = getQrCodeOffsetValue(new TextEncoder().encode(dataToEncode).length);

        const data = `
^XA
^MMT 
^PW406
^LL0639
^LS0
^FO0,0^GB405,638,8^FS
^FT118,630^A0B,58,58^FB620,2,0,C^FD${un}^FS
^FT136,${qrSizeOffset[0]}^BQN,2,${qrSizeOffset[1]}
^FH\^FDMA,${dataToEncode}^FS
^FO320,0^GFA,6996,6996,11,gGFC:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::SFCMFCSFC1LFCSFE07KFCTFC0KFCUF03JFCUFE0JFCVF81IFCUFE007FFCUF81C7FFCTFC0FE3FFCTF03FF3FFCSFC0IF3FFCSFC7IFBFFCSFDMFCVFCJFCSFCFFE7IFC:SFCFF87IFCRFCJ0JFCRFEI01JFCSFCMFC:gGFC:RF9CI0JFCRF8CI0JFCRF9CI0JFCgGFC:::SFEI0JFCSFCI0JFCSFC7LFCSFCMFC::SFEMFCSFE7LFCTF200JFCSFEI0JFCSFCI0JFCSFCMFC:::SFE7LFCSFE3LFCSFCI0JFC:gGFC:::RF9C924JFCRF8CI0JFC:gGFC::SFDFFEJFCSFCFF8JFCSFC3F0JFCTF1E3JFCTF887JFCTFC1KFCTFE1KFCTFC0KFCTF0C3JFCSFE3E1JFCSFC7F8JFCSFCFFCJFCSFDFFEJFCgGFCTF807JFCTF003JFCSFE3F1JFCSFC7F8JFCSFCFFCJFCSFCFFC7IFC::SFCFFCJFCSFC7F8JFCSFE3F1JFCTF001JFCTF807JFCUFBKFCgGFCSFCMFC::SFE7LFCSFE3LFCSFCI0JFCSFCI07IFCgGFC::SF8MFCRFE03LFCRFC01LFCRF878LFCRF8FCLFCRF9FCLFCRF9FC7KFCRF9FCLFCRF9FC7KFCRF9FCLFCRF9FC7KFC:RF8J0JFC:gGFC:::::::::::SFE783JFCSFE301JFCSFC300JFCSFC718JFCSFC61CJFC:SFC638JFCSFC438JFCSFC038JFCSFE030JFCSFE071JFCTF9F9JFCSFDFFE7IFCSFCFFCJFCSFC7F87IFCSFC3F0JFCSFC1C0JFCSFE081JFCTF003JFCTF80KFCTFC1KFCUF0KFCRF8J0JFC:::gGFC:SFC7LFC::SFE3LFCSFE15AJFCSFCI0JFC::gGFC::TFC0KFCTF003JFCSFE001JFCSFEI0JFCSFC1E0JFCSFC3F0JFCSFC7F87IFC::SFC3F8JFCSFC1E0JFCSFEI0JFCSFE001JFCTF003JFCTFC0KFCRF9NFCRF81MFCRF803LFCRF8003KFCRF8I07JFCSF8I0JFCTF800JFCUF80JFCUF00JFCTFI0JFCSF8003JFCRF8003KFCRF803LFCRF80MFCRF800LFCRFEI0KFCSFEI0JFCTFC00JFCUFC0JFCTFE00JFCSFEI0JFCRFEI01JFCRF8001KFCRF800LFCRF80MFCOF7FF87MFCNF87QFCMFC07JFI0JFCLFE007IFCI0JFCLFI07IFCI0JFCKF8I07IFCI0JFCJF8J0JF83LFCIFEJ07JFC7LFCIFCJ0KFC7LFCIFC0030KFC7LFCIFC01F0KFE3LFCIFC03F0KFEI0JFCIFC0070KFCI0JFCIFCJ0KFCI0JFC:JF8I01RFCKFJ07QFCKFEI07QFCLFC007JFC0KFCMF807JF803JFCNF07IFE001JFCNFE7IFEI0JFCKF1IF7IFC1E0JFCJFC03FC7IFC3F0JFCJF001F87IFC7F87IFCIFEI0E07IFC7F87IFCIFEI0807IFC7F87IFCIFEK07IFC3F8JFCIFC06I07IFC1E0JFCIFC0F001JFEI0JFCIFC1F803JFE001JFCIFC1F80LF003JFCIFC1F83LFC0KFCIFC1D875RFCIFCK07QFCIFCK07FF9NFCIFCK07FF0CI0JFC::RF1CI0JFCgGFCJFE3F07RFCJF80E01JFC7F8JFCJF00400JFC7F8JFCIFEK0JFC7F8JFCIFEK07FFCJ0JFCIFCK07FFCJ0JFCIFC0C0F07FFCJ0JFCIFC1E0F87FFCI03JFCIFC1E1F87IFC7LFCIFC3F1F87IFC7LFCIFC3F1F87QFCIFCK07JFC0KFCIFCK07JF803JFCIFCK07JF001JFCIFCK07IFEI0JFCIFCK07IFC1E0JFCIFC40010JFC3F0JFCSFC7F87IFC:IFC1E0F07IFC7F87IFCIFC1E0F07IFC3F8JFCIFC1E0F07IFC1E0JFCIFC1E0F07IFEI0JFCIFC1E0F07IFE001JFCIFC1E0F07JF003JFCIFC1E0F07JFC0KFCIFC1E0F07QFCIFCK07QFC:IFCK07FF8J0JFC::RF8J0JFCRF81MFCIFDNF803LFCIFC7IF7IFE00LFCIFC1IF1JF801KFCIFC07FF07JF007JFCIFC01FF07JFC00JFCIFC007F07KF00JFCIFC001F07JFC00JFCIFCI0707JF003JFCIFCI0107IF801KFCIFC1J07FFE007KFCIFC1CI07FF803LFCIFC1FI07FF80MFCIFC1FC007FF8J0JFCIFC1FF007FF8J0JFCIFC1FFC07FF8J0JFCJF1IF07FF8J0JFCJFDIFC7QFCOF7QFCgGFC::::::::::::::::::^FS
^PQ1,0,1,Y
^XZ
  `;

        //TODO: revert this
        try {
          $scope.printers[0].send(data, null, () => {
            console.error('Printer Error');
          });
          console.log('printed this:\n' + data);
        } catch (e) {
          console.error('Printer Error');
        }
      }

      function getQrCodeOffsetValue(dataSize) {
        if (dataSize < 26) {
          // QR Code is 25x25
          return [418, 6];
        } else if (dataSize < 42) {
          // QR Code is 29x29
          return [435, 6];
        } else if (dataSize < 62) {
          // QR Code is 33x33
          return [425, 5];
        } else if (dataSize < 84) {
          // QR Code is 37x37
          return [418, 4];
        } else if (dataSize < 106) {
          // QR Code is 41x41
          return [428, 4];
        } else if (dataSize < 122) {
          // QR Code is 45x45
          return [410, 3];
        } else if (dataSize < 152) {
          // QR Code is 49x49
          return [418, 3];
        } else if (dataSize < 180) {
          // QR Code is 53x53
          return [422, 3];
        } else if (dataSize < 213) {
          // QR Code is 57x57
          return [428, 3];
        } else if (dataSize < 251) {
          return [434, 3];
        } else if (dataSize < 287) {
          //TODO: Check if 2x magnification is too small
          return [408, 2];
        } else if (dataSize < 331) {
          return [412, 2];
        } else if (dataSize < 362) {
          return [418, 2];
        } else if (dataSize < 412) {
          return [422, 3];
        } else {
          throw new Error('Too much data');
        }
        // return: [QR horizontal offset, magnification]
      }

      $scope.handlePrintButton = function () {
        if ($scope.printers) {
          printBadges();
        } else {
          alert('No printer found');
        }
      };

      angular.element(document).ready(function () {
        findPrinters();
      });
    },
  ]);
