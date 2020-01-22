const HttpStatus = require('http-status-codes');
const express = require('express');
const proxy = require('http-proxy-middleware');
const config = require('./config');
const pack = require('../package.json');
const cors = require('cors');

const app = express();

app.set('port', config.PORT);

// socket.io
// can work as event listener for online admins
//const server = require("http").Server(app);
//const io = require("socket.io")(server, {
//  origins: app.get('port')
//});

// Implement status call
app.use('/status', (req, res, next) => {
  res.header('Content-Type', 'text/plain; charset=utf-8');
  res.status(HttpStatus.OK).send();
});

// Serve static content from the build folder
app.use(express.static('build'));

if (!config.isProduction) {
  app.use(cors());
}

// Handle API calls
const apiProxy = proxy({
  target: config.PAPI_ENDPOINT,
  logLevel: 'debug',
  pathRewrite: path => path.replace('/api', '/'),
  changeOrigin: true,
});

app.use('/api', apiProxy);

// Not found error handling
/* eslint-disable no-unused-vars */
app.use((req, res) => {
    console.log(`Not found URL: ${req.url}`);
  res
    .status(HttpStatus.NOT_FOUND)
    .send({
      errors: new Error(HttpStatus.NOT_FOUND, HttpStatus.getStatusText(HttpStatus.NOT_FOUND)),
    });
});

// 500 error handling
app.use((err, req, res, next) => {
  console.log(`Internal server error: ${err}`);
  res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(JSON.stringify({
    status: 'error',
    message: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR),
  }));
});
/* eslint-enable no-unused-vars */

// Express error logging
app.on('error', (err) => {
  console.log(`Express: ${err}`);
});

// Start web server using defined port
app.listen(app.get('port'), () => {
  console.log(`${pack.name} is running on port ${app.get('port')}`);
});

// SOCKET IO // SOCKET IO // SOCKET IO // SOCKET IO
// only for data refresh events by tablename
// anything more needs a more advanced setup
// can work as event listener for online admins

//io.on("connection", function(socket) {
//    console.log('a user connected');
//    socket.on("disconnect", () => {
//      console.log('a user disconnected');
//    });
//    socket.on("modifyData", tablename => {
//      if  (typeof tablename === 'string') {
//        io.sockets.emit("dataUpdate", tablename);
//      }
//    });
//});
