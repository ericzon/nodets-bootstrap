"use strict";

import * as winston from "winston";

const tsFormat = () => (new Date());
const logger = new (winston.Logger)({
  transports: [
    new (winston.transports.Console)({
      colorize: true,
      prettyPrint: true,
      timestamp: tsFormat
    })]
});

logger.level = (process.env.LOG_LEVEL || "info");
console.log("logger.level: ",logger.level);

export default logger;