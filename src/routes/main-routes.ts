"use strict";

import * as express from 'express';
import logger from '../libs/logger';

export default (app: any) => {
	logger.info("Main route enabled");
	const router = express.Router();
	router.get('/', (req: express.Request, res: express.Response) => {
		let msg = new Date() + "/ request";
		res.json({ msg: msg });
	});
	app.use(router);
};
