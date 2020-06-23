# Badge printer for AngularJS

Created in AngularJS 1.7.5. To setup:
1. `npm i` to install relevant packages. This should also run `npm run postinstall`, which copies needed library files into the project. After this, there should be a `lib` folder within `app` that contains angular, browser-print, qrcode and others
3. Client machine must install and run Zebra BrowserPrint SDK software for their windows/mac machine to print to ZPL. This can be found in the `BrowserPrint` Folder
4. Start project server with `npm run start`

QRCode library and BrowserPrint JS library must be integrated into AngularJS to work.
## PDF printing

Example: http://localhost:8000/#!/paper-badges

Data is provided to the page with URL Parameters. The data is formatted as such:

`data=[{"id"="id1","un"="username 1"},{"id"="id2","un"="username 2"},...]`

An Example URL would look like this:

`http://localhost:8000/#!/paper-badges?data=%5B%7B%22un%22:%22Person%201%22,%22id%22:%22id1%22%7D,%7B%22un%22:%22person%202%22,%22id%22:%22id2%22%7D,%7B%22un%22:%22person%203%22,%22id%22:%22id3%22%7D%5D`

## ZPL Printing

Not finished.
