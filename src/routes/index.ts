"use strict";

import * as fs from 'fs';
import { Router, Request, Response } from 'express';

export class RoutesProvider {
    constructor() {}

    public static initRoutes(app: any) {
        console.log("Loading routes...");
        // console.log("__dirname -> ",__dirname);
        fs.readdirSync(__dirname).forEach((file) => {
            if (/(\.d\.ts$|index\.js$)/.test(file)) return;
            var name = file.substr(0, file.indexOf('.'));
            console.log("Loading: ",name);
            let dynFilePath = './'+name
            let aRoute = require(dynFilePath);
            aRoute.default(app);
        });
    }
}
