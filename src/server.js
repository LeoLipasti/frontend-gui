const HttpStatus = require('http-status-codes');
const express = require('express');
const proxy = require('http-proxy-middleware');
const config = require('./config');
const pack = require('../package.json');
const cors = require('cors');

const app = express();

app.set('port', config.PORT);

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

// Routing with query to return app state on refresh
/* eslint-disable no-unused-vars */
app.use((req, res) => {
  console.log(`Not found URL: ${req.url}`);
  res.redirect(`/?${req.url}`);
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
