const express = require('express');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');
const userRouter = require('./resources/users/user.router');
const boardsRouter = require('./resources/boards/boards.router');
const fs = require('fs');
const winston = require('winston');
const expressWinston = require('express-winston');

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(express.json());

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});
app.use(
  expressWinston.logger({
    transports: [
      new winston.transports.Console(),
      new winston.transports.File({
        filename: './logs/history.log',
        level: 'info'
      })
    ],
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.json()
    ),
    meta: true, // optional: control whether you want to log the meta data about the request (default to true)
    requestWhitelist: ['url', 'query', 'body'],
    dynamicMeta(req, res) {
      return {
        body: req.body ? req.body : null,
        params: req.params ? req.params : null
      };
    },
    msg: "HTTP {{req.method}} {{req.url}}", // optional: customize the default logging message. E.g. "{{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}"
    expressFormat: true, // Use the default Express/morgan request formatting. Enabling this will override any msg if true. Will only output colors with colorize set to true
    colorize: false, // Color the text and status code, using the Express/morgan color palette (text: gray, status: default green, 3XX cyan, 4XX yellow, 5XX red).
    ignoreRoute(req, res) {
      return false;
    } // optional: allows to skip some log messages based on request and/or response
  })
);

app.use('/users', userRouter);
app.use('/boards', boardsRouter);

process.on('uncaughtException', error => {
  fs.writeFileSync('./logs/crash-data.log', error.message);
  console.error(error, JSON.stringify(error));
  process.exit(1);
});

module.exports = app;
