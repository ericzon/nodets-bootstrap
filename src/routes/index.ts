"use strict";

import * as fs from 'fs';
import { Router, Request, Response } from 'express';
import logger from '../libs/logger';

export class RoutesProvider {
    constructor() {}

    public static initRoutes(app: any) {
        logger.info("Loading routes...");
        fs.readdirSync(__dirname).forEach((file) => {
            if (/(\.d\.ts$|index\.js$)/.test(file)) return;
            var name = file.substr(0, file.indexOf('.'));
            logger.verbose("Loading: ",name);
            let dynFilePath = './'+name
            let aRoute = require(dynFilePath);
            aRoute.default(app);
        });
    }
}
