"use strict";

import * as http from 'http';
import * as express from "express";
import * as cors from 'cors';
import * as bodyParser from 'body-parser';
import { RoutesProvider } from './routes';
import { ToolsController } from './controllers/tools.server.controller';
import logger from './libs/logger';
import config from './config/config';
import * as compression from 'compression';

const swaggerJSDoc = require('swagger-jsdoc');
const helmet = require('helmet');
const favicon = require('serve-favicons');
const port = ToolsController.normalizePort( process.env.PORT || config.port );
const app: express.Application = express();

const options = {
  swaggerDefinition: {
    info: {
      title: 'Hello Swagger',
      version: '1.0.0',
    },
  },
  apis: [__dirname + '/routes/*.js'],
};
const swaggerSpec = swaggerJSDoc(options);

app.use(helmet());
app.use(favicon(__dirname + '/../public/favicon.ico'));
app.use('/docs',express.static(__dirname + '/../swagger'));
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded( { extended: false } ));
app.use(cors());
app.use(require("morgan")(':method :url :status - HTTP/:http-version - :remote-addr - :res[content-length] - [:date[clf]] - :response-time ms - :user-agent'));
logger.info("Loading config: ",config);
RoutesProvider.initRoutes(app);

app.get('/docs/api-docs.json', function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

const server = http.createServer(app).listen(port);

server.on("listening", function onListening() {
	var addr = server.address();
	var bind = typeof addr === "string"
	? "pipe " + addr
	: "port " + addr.port;
	logger.info("Listening on " + bind);
});

server.on("error", function onError(error: any) {
  if (error.syscall !== "listen") {
    throw error;
  }

  var bind = typeof port === "string"
    ? "Pipe " + port
    : "Port " + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      logger.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      logger.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
});

