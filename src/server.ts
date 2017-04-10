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

const helmet = require('helmet');
const favicon = require('serve-favicons');
const port = ToolsController.normalizePort( process.env.PORT || config.port );
const app: express.Application = express();
app.use(helmet());
app.use(favicon(__dirname + '/../public/favicon.ico'));
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded( { extended: false } ));
app.use(cors());
app.use(require("morgan")(':method :url :status - HTTP/:http-version - :remote-addr - :res[content-length] - [:date[clf]] - :response-time ms - :user-agent'));
logger.info("Loading config: ",config);
RoutesProvider.initRoutes(app);

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

