# Badge printer for AngularJS

Created in AngularJS 1.7.5. To setup:

1. `npm i` to install relevant packages. This should also run `npm run postinstall`, which copies needed library files into the project. After this, there should be a `lib` folder within `app` that contains angular, browser-print, qrcode and others
2. Client machine must install and run Zebra BrowserPrint SDK software for their windows/mac machine to print to ZPL. This can be found in the `BrowserPrint` Folder
3. Start project server with `npm run start`

QRCode library and BrowserPrint JS library must be integrated into AngularJS to work.

## PDF printing

Example: http://localhost:8000/#!/paper-badges

Data is provided to the page with URL Parameters. The data is formatted as such:

`data=[{"id"="id1","un"="username 1"},{"id"="id2","un"="username 2"},...]`

An Example URL would look like this:

`http://localhost:8000/#!/paper-badges?data=%5B%7B%22un%22:%22Person%201%22,%22id%22:%22id1%22%7D,%7B%22un%22:%22person%202%22,%22id%22:%22id2%22%7D,%7B%22un%22:%22person%203%22,%22id%22:%22id3%22%7D%5D`

## ZPL Printing

Example works similarly to PDF:

`http://localhost:8000/#!/zpl-badges?data=%5B%7B%22un%22:%22Person%201%22,%22id%22:%22id1%22%7D,%7B%22un%22:%22person%202%22,%22id%22:%22id2%22%7D,%7B%22un%22:%22person%203%22,%22id%22:%22id3%22%7D%5D`

Data can be passed through as props to the `zpl-badge` component:

```
<zpl-badge data="data"/>
```

The implemenentation of the ZPL print is slightly more complex, as a UI is needed to allow the user to chose which printer to print to. 

The UI provided is optional and can be changed to match the rest of the tagnos UI. 

The BrowserPrint software is needed to be running on the client machine for ZPL printing to work.

### Contact
For any issues, please reach me at: lwalton@zebra.com
