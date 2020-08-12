require('module-alias/register')
const HttpStatus = require('http-status-codes');
const express = require('express');
const proxy = require('http-proxy-middleware');
const config = require('./config');
const pack = require('../package.json');
const cors = require('cors');

const app = express();

app.set('port', config.PORT);

// Implement health/status call
app.use('/health', (req, res, next) => {
  res.header('Content-Type', 'text/plain; charset=utf-8');
  res.status(HttpStatus.OK).send();
});

// Serve static content from the build folder
app.use(express.static('build'));

//if (!config.isProduction) {
//  app.use(cors());
//}
app.use(cors());

const key = [...Array(10)].map(i=>(~~(Math.random()*36)).toString(36)).join('');

const Cryptr = require('cryptr');
const cryptr = new Cryptr(
  key
);

// App models
const models = require('./models/index');

// 1. App Serve Models
app.use((req, res, next) => {
  // serve imported models from models route
  res.set('Content-Type', 'application/vnd.api+json; charset=utf-8');
  const requrl = req.url;
  if (requrl.split('/').length > 2 && requrl.split('/')[2] === 'models') {
    const reqmodel = `${req.url.split('/')[3]}`;
    if (models.hasOwnProperty(reqmodel)) {
      const resmodel = models[reqmodel];
      res.send(JSON.stringify(resmodel));
    } else {
      res.send(JSON.stringify({ error: reqmodel }));
    }
  } else {
    next();
  }
});


// 2. PROXY - Handle API calls
const apiProxy = proxy({
  target: config.PAPI_ENDPOINT,
  logLevel: 'debug',
  pathRewrite: path => path.replace('/api', '/'),
  changeOrigin: true,
  selfHandleResponse : true,
  onProxyRes: (proxyRes, req, res) => {
    var body = Buffer.from('');
    proxyRes.on('data', function(data) {
        body = Buffer.concat([body, data]);
    });
    proxyRes.on('end', function() {
      body = JSON.parse(body.toString());
      if (!!body && !!body.data && body.data.type === 'token') {
        // remove logs once confirmed that works
        console.log('token: ' + body.data.attributes.token);
        console.log('token encrypted: ' + cryptr.encrypt(body.data.attributes.token));
        console.log('token decrypted: ' + cryptr.decrypt(cryptr.encrypt(body.data.attributes.token)));
        // remove logs once confirmed that works
        body.data.attributes.token = cryptr.encrypt(body.data.attributes.token);
      }
      body = JSON.stringify(body);
      res.end(body);
    });
  },
  onProxyReq: (proxyReq, req, res) => {
    const token = req.headers['Authorization'.toLowerCase()];
    if (!!token && token !== '') {
      try {
        proxyReq.setHeader('Authorization', cryptr.decrypt(token));
        // remove logs once confirmed that works
        console.log('token encrypted: ' + token);
        console.log('token decrypted: ' + cryptr.decrypt(token));
        // remove logs once confirmed that works
      } catch(err) {
        console.log(err)
      }
    }
  }
});

app.use('/api', apiProxy);

// 3. App Routing
// Routing with query to return app state on refresh
/* eslint-disable no-unused-vars */
app.use((req, res) => {
  // FOR SPA ROUTING REDIRECT WITH QUERY
  if (req.url.substring(0, 2) !== "/?") {
    res.redirect(`/?${req.url}`);
  } else {
    console.log(`Not found URL: ${req.url}`);
    res.status(HttpStatus.NOT_FOUND).send(JSON.stringify({
      status: 'error',
      message: HttpStatus.getStatusText(HttpStatus.NOT_FOUND),
    }));
  }
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
