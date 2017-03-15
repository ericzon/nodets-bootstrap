"use strict";

import * as winston from "winston";

const tsFormat = () => (new Date());
const consoleTransport = new (winston.transports.Console)({
      colorize: true,
      prettyPrint: true,
      timestamp: tsFormat
    });


const originalLog = consoleTransport.log;
consoleTransport.log = function(level: any, msg: any, meta: any, callback: any) {
  if(meta) {
    if(meta instanceof Error) {
      meta = meta.toString();
    } else {
      meta = JSON.parse(JSON.stringify(meta));
    }
  }
  return originalLog.call(consoleTransport, level, msg, meta, callback);
};

const logger = new (winston.Logger)({
  transports: [ consoleTransport ]
});

logger.level = (process.env.LOG_LEVEL || "verbose");
console.log("Logger level: ",logger.level);

export default logger;