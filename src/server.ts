"use strict";

import * as http from 'http';
import * as express from "express";
import { RoutesProvider } from './routes';
import { ToolsController } from './controllers/tools.server.controller';
import logger from './libs/logger';

const cfg = require('./config/config');
const port = ToolsController.normalizePort( process.env.PORT || cfg.port );
const app: express.Application = express();

logger.info("Loading config: ",cfg);
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

exports.logger = logger;

