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
      const printErrString = 'No printer found - Is BrowserPrint running, and the printer on and connected?';

      function printBadges() {
        // Creates badges ZPL and sends to printer
        let dataToPrint = '';
        $scope.$ctrl.data.forEach((x) => {
          dataToPrint += generateLabel(x.un, x.id);
        });
        try {
          // $scope.props.printers[$scope.props.selectedPrinter].send(dataToPrint, null, (e) => {
          //   console.error(e);
          //   alert('Print failed. Please try again.');
          // });
          console.log('printed this:\n' + dataToPrint);
        } catch (e) {
          alert('Print failed. Please try again.');
          console.error(e);
        }
      }

      function generateLabel(un, id) {
        // Generates a single ZPL label to be sent to a printer
        const orientation = $scope.props.orientation;
        const dataToEncode = `zmwprox1://{id:"${id}",un:"${un}"}`;
        const qrSizeOffset =
          orientation === 1
            ? getQrCodeOffsetValuePortrait(new TextEncoder().encode(dataToEncode).length)
            : getQrCodeOffsetValueLandscape(new TextEncoder().encode(dataToEncode).length); // TODO:

        const zpl = `^XA
^MMT 
^PW${orientation === 0 ? '608' : '406'}
^LL${orientation === 0 ? '410' : '639'}
^LS0
^LH0
^FO0,${orientation === 0 ? '10' : '0'}
^GB${orientation === 0 ? '608,400' : '405,638'},8,b,0^FS
^FT${orientation === 0 ? '8,126' : '118,630'}
^A0${orientation === 0 ? 'N' : 'B'}58,58
^FB${orientation === 0 ? '592' : '620'},2,0,C
^FD${un.toUpperCase()}^FS
^FT${orientation === 0 ? qrSizeOffset[0] + ',320' : '136,' + qrSizeOffset[0]},^BQN,2,${qrSizeOffset[1]}
^FH^FDMA,${dataToEncode}^FS
^FO${
          orientation === 0
            ? '0,316^GFA,6840,6840,76,mQFC:::::::::::::JFCI02I06I0FC001FFC03lKFCJFCI02I04I03CI0FFC01lKFCJF8I02I06I01CI07F801lKFCJFJ06I06J0CI03F800lKFCJFJ06I04J08I01F800lKFCJF8I0EI0EJ0CI01FI0lKFCKFE01E03FC0380C0600FI07lJFCKFE01E03FE078080700FI07lJFCKFC01E03FC0780C0F01EI07lJFCKFC03EI06J080701EI03lJFCKF807EI04I01C0601EI03lJFCKF807EI06I03CI01C0203lJFCKF00FEI06I018I01C0603lJFCKF00FEI06J0CI03C0601lJFCJFE01FEI04J08I07CI01lJFCJFE01FE03FE07804I0F8I01lJFCJFC03FE03FC078K0F8J0lJFCJFC03FE03FE078K0FK0lJFCJF8I06I0407L07K0lJFCJF8I06I06J0CI03K07lIFCJFJ06I06J080CI01FC07lIFCIFEJ0EI06I01C06I03FC07lIFCIFEI01EI06I03C0EI03FC03lIFCIFEI01EI06I0FC0FI07FE07lIFCmQFC::::::::WFClSFCWF83lRFCJF80FF01MF03NF07E0FC1LFE0NF8007PFC7LF8iXFCJF00FF00KF0F03NF03E0F81LFE0NF8003PFC7LF0F3iVFCJF807E00KF0783NF03E0781LFE0NF8001PFC7LF0F1iVFCJF007E00KF0787NF03C0781LFE0NF8740PFC7LF8F1iVFCJF003C00KF07PF03C0783LFE0NF87F0gF1iVFCJF003C00F807C0183F01FC20381C0703E03F8420F0700IF8FF0C63E03E3F0C7881C0F8C007FC7iQFCJF803C00F00380083C00780018180303800F0020E06007FF87F0C03C00C1F0C78J0708003F87iQFCJF001800EI0800838003CI08180303I070020C04003FF8FF0C03I060E1C38J0708003F87iQFCJF001800CL083I01CI08180306I030020808003FF87E0C0F07870C3C78383830F1C1F0iRFCJFL080C040183010180C0C080206060301E00181C7FF8001C1E0FC3803C38787C30F1E1F0iRFCJFL081E07078307C081E0C0840040F8103E003801IF8001C3E1FC3807C78787C30F1F1E1iRFCJF02004081F07078207C081E0C0040040F8107E007C007FF8007C3E1FC3C0FC38787C30F1F0E1iRFCJF82004083F07078207C0C1E0E00400C0F8107E007C003FF800FC3E1FC3E0FC78F87C30E1F0E1iRFCJF0300C083F07078207C081E0E00C00C0F8107E007E003FF87FFC3E1FC3C0FC38787C30F1F8C3iRFCJF0100C081F07078207C0C1E0E00E00C0F8107E003FC03FF87FFC3E1FC3807C78F87C30E1F843iRFCJF0380C080E070783038181E0E00E01C070307E001C783FF87FFC3E0FC3803C38787C30F1FC07iRFCJF0381C0CI070183I0181E0F00E01EI0307E0808083FF87FFC3F0F870C3C78F87C30E1FC07iRFCJF0381C0CI0F0083800381E0F01E01EI0707E0CJ03FF87FFC3FI060E1C38787C30F0FE0iSFCJF83C3C0E001F00838003C1E0F01F03FI0F07E0EJ07FF87FFC3F800C1F0C78F87C30F03E0iSFCJF83C3C1F003F8083E007C1E0F81F03F801F07E0F0200IF87FFC3FC01C3F0C78F87C30F03E0iSFCJFC7E7E1FC0FFC3C7F01FE3F1FC3F87FE07JF1F0783IFCIFE7FF07E7FDE7FFCFE7DFC3F1iSFCiVFE1iSFCiVFC3iSFCiUFE03iSFCiUFE07iSFCiUFE0iTFCmQFC::::::::::::::^FS'
            : '320,0^GFA,6996,6996,11,gGFC:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::SFCMFCSFC1LFCSFE07KFCTFC0KFCUF03JFCUFE0JFCVF81IFCUFE007FFCUF81C7FFCTFC0FE3FFCTF03FF3FFCSFC0IF3FFCSFC7IFBFFCSFDMFCVFCJFCSFCFFE7IFC:SFCFF87IFCRFCJ0JFCRFEI01JFCSFCMFC:gGFC:RF9CI0JFCRF8CI0JFCRF9CI0JFCgGFC:::SFEI0JFCSFCI0JFCSFC7LFCSFCMFC::SFEMFCSFE7LFCTF200JFCSFEI0JFCSFCI0JFCSFCMFC:::SFE7LFCSFE3LFCSFCI0JFC:gGFC:::RF9C924JFCRF8CI0JFC:gGFC::SFDFFEJFCSFCFF8JFCSFC3F0JFCTF1E3JFCTF887JFCTFC1KFCTFE1KFCTFC0KFCTF0C3JFCSFE3E1JFCSFC7F8JFCSFCFFCJFCSFDFFEJFCgGFCTF807JFCTF003JFCSFE3F1JFCSFC7F8JFCSFCFFCJFCSFCFFC7IFC::SFCFFCJFCSFC7F8JFCSFE3F1JFCTF001JFCTF807JFCUFBKFCgGFCSFCMFC::SFE7LFCSFE3LFCSFCI0JFCSFCI07IFCgGFC::SF8MFCRFE03LFCRFC01LFCRF878LFCRF8FCLFCRF9FCLFCRF9FC7KFCRF9FCLFCRF9FC7KFCRF9FCLFCRF9FC7KFC:RF8J0JFC:gGFC:::::::::::SFE783JFCSFE301JFCSFC300JFCSFC718JFCSFC61CJFC:SFC638JFCSFC438JFCSFC038JFCSFE030JFCSFE071JFCTF9F9JFCSFDFFE7IFCSFCFFCJFCSFC7F87IFCSFC3F0JFCSFC1C0JFCSFE081JFCTF003JFCTF80KFCTFC1KFCUF0KFCRF8J0JFC:::gGFC:SFC7LFC::SFE3LFCSFE15AJFCSFCI0JFC::gGFC::TFC0KFCTF003JFCSFE001JFCSFEI0JFCSFC1E0JFCSFC3F0JFCSFC7F87IFC::SFC3F8JFCSFC1E0JFCSFEI0JFCSFE001JFCTF003JFCTFC0KFCRF9NFCRF81MFCRF803LFCRF8003KFCRF8I07JFCSF8I0JFCTF800JFCUF80JFCUF00JFCTFI0JFCSF8003JFCRF8003KFCRF803LFCRF80MFCRF800LFCRFEI0KFCSFEI0JFCTFC00JFCUFC0JFCTFE00JFCSFEI0JFCRFEI01JFCRF8001KFCRF800LFCRF80MFCOF7FF87MFCNF87QFCMFC07JFI0JFCLFE007IFCI0JFCLFI07IFCI0JFCKF8I07IFCI0JFCJF8J0JF83LFCIFEJ07JFC7LFCIFCJ0KFC7LFCIFC0030KFC7LFCIFC01F0KFE3LFCIFC03F0KFEI0JFCIFC0070KFCI0JFCIFCJ0KFCI0JFC:JF8I01RFCKFJ07QFCKFEI07QFCLFC007JFC0KFCMF807JF803JFCNF07IFE001JFCNFE7IFEI0JFCKF1IF7IFC1E0JFCJFC03FC7IFC3F0JFCJF001F87IFC7F87IFCIFEI0E07IFC7F87IFCIFEI0807IFC7F87IFCIFEK07IFC3F8JFCIFC06I07IFC1E0JFCIFC0F001JFEI0JFCIFC1F803JFE001JFCIFC1F80LF003JFCIFC1F83LFC0KFCIFC1D875RFCIFCK07QFCIFCK07FF9NFCIFCK07FF0CI0JFC::RF1CI0JFCgGFCJFE3F07RFCJF80E01JFC7F8JFCJF00400JFC7F8JFCIFEK0JFC7F8JFCIFEK07FFCJ0JFCIFCK07FFCJ0JFCIFC0C0F07FFCJ0JFCIFC1E0F87FFCI03JFCIFC1E1F87IFC7LFCIFC3F1F87IFC7LFCIFC3F1F87QFCIFCK07JFC0KFCIFCK07JF803JFCIFCK07JF001JFCIFCK07IFEI0JFCIFCK07IFC1E0JFCIFC40010JFC3F0JFCSFC7F87IFC:IFC1E0F07IFC7F87IFCIFC1E0F07IFC3F8JFCIFC1E0F07IFC1E0JFCIFC1E0F07IFEI0JFCIFC1E0F07IFE001JFCIFC1E0F07JF003JFCIFC1E0F07JFC0KFCIFC1E0F07QFCIFCK07QFC:IFCK07FF8J0JFC::RF8J0JFCRF81MFCIFDNF803LFCIFC7IF7IFE00LFCIFC1IF1JF801KFCIFC07FF07JF007JFCIFC01FF07JFC00JFCIFC007F07KF00JFCIFC001F07JFC00JFCIFCI0707JF003JFCIFCI0107IF801KFCIFC1J07FFE007KFCIFC1CI07FF803LFCIFC1FI07FF80MFCIFC1FC007FF8J0JFCIFC1FF007FF8J0JFCIFC1FFC07FF8J0JFCJF1IF07FF8J0JFCJFDIFC7QFCOF7QFCgGFC::::::::::::::::::'
        }^FS
^XZ`;
        return zpl;
      }

      function getQrCodeOffsetValuePortrait(dataSize) {
        // Offset value to make sure Qr code is centered (ish) in badge
        if (dataSize < 42) {
          return [232, 5];
        } else if (dataSize < 62) {
          return [425, 5];
        } else if (dataSize < 84) {
          return [418, 4];
        } else if (dataSize < 106) {
          return [428, 4];
        } else if (dataSize < 122) {
          return [410, 3];
        } else if (dataSize < 152) {
          return [418, 3];
        } else if (dataSize < 180) {
          return [422, 3];
        } else if (dataSize < 213) {
          return [428, 3];
        } else if (dataSize < 251) {
          return [434, 3];
        } else if (dataSize < 287) {
          return [408, 2];
        } else if (dataSize < 331) {
          return [412, 2];
        } else if (dataSize < 362) {
          return [418, 2];
        } else if (dataSize < 412) {
          return [422, 2];
        } else {
          throw new Error('Too much data');
        }
        // return: [QR horizontal offset, magnification]
      }

      function getQrCodeOffsetValueLandscape(dataSize) {
        // Offset value to make sure Qr code is centered (ish) in badge
        //TODO:
        if (dataSize < 42) {
          return [232, 5];
        } else if (dataSize < 62) {
          return [221, 5];
        } else if (dataSize < 84) {
          return [211, 5];
        } else if (dataSize < 106) {
          return [221, 4];
        } else if (dataSize < 122) {
          return [214, 4];
        } else if (dataSize < 152) {
          return [230, 3];
        } else if (dataSize < 180) {
          return [224, 3];
        } else if (dataSize < 213) {
          return [219, 3];
        } else if (dataSize < 251) {
          return [212, 3];
        } else if (dataSize < 287) {
          return [239, 2];
        } else if (dataSize < 331) {
          return [235, 2];
        } else if (dataSize < 362) {
          return [233, 2];
        } else if (dataSize < 412) {
          return [229, 2];
        } else if (dataSize < 450) {
          return [223, 2];
        } else if (dataSize < 506) {
          return [219, 2];
        } else {
          console.log(dataSize);
          throw new Error('Too much data');
        }
        // return: [QR horizontal offset, magnification]
      }

      $scope.handlePrintButton = function () {
        if ($scope.props.printers) {
          printBadges();
        } else {
          alert('No printer found');
        }
      };

      $scope.findPrinters = function () {
        // Checks for the defualt printer and any other printers available
        $scope.props.loading = true;

        const defaultPromise = new Promise((resolve) => {
          try {
            BrowserPrint.getDefaultDevice('printer', (device) => {
              resolve(device ? device : null);
            });
          } catch (e) {
            console.error(e);
          }
        });

        const localPromise = new Promise((resolve) => {
          try {
            BrowserPrint.getLocalDevices(
              (list) => {
                resolve(list);
              },
              () => {
                resolve(null);
              },
              'printer'
            );
          } catch (e) {
            console.error(e);
          }
        });

        Promise.allSettled([defaultPromise, localPromise])
          .then((val) => {
            $scope.props.printers = [];
            if (val[0].status === 'fulfilled' && val[0].value.name) {
              $scope.props.printers.push(val[0].value);
            }
            if (val[1].status === 'fulfilled' && val[1].value.length > 0) {
              val[1].value.forEach((e) => {
                if (e.name) {
                  $scope.props.printers.push(e);
                }
              });
            }

            $scope.props.loading = false;
            $scope.$apply();
            let i = $scope.props.error.indexOf(printErrString);
            if ($scope.props.printers.length < 1) {
              if (i === -1) {
                $scope.props.error.push(printErrString);
                $scope.$apply();
              }
            } else {
              if (i !== -1) {
                $scope.props.error.splice(i, 1);
              }
            }
          })
          .catch((e) => {
            $scope.props.loading = false;
            console.error(e);
          });
      };

      angular.element(document).ready(function () {
        //When page has loaded, check for printer and check for errors
        $scope.props.loading = true;
        $scope.props.error = [];
        // $scope.props.orientation = orientation.portrait;
        $scope.props.orientations = { 0: { name: 'Landscape' }, 1: { name: 'Portrait' } };
        if ($scope.$ctrl.data.length < 1) {
          $scope.props.error.push('No data to print');
        }
        $scope.$apply();
        $scope.findPrinters();
      });
    },
  ]);
