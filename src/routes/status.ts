"use strict";

import * as express from 'express';
import logger from '../libs/logger';

export default (app: any) => {
	logger.info("Status route enabled");
	const router = express.Router();

	/**
	 * @swagger
	 * /status:
	 *   get:
	 *     tags:
	 *       - status
	 *     description: Returns health check
	 *     produces:
	 *       - application/json
	 *     responses:
	 *       200:
	 *         description: A healthy message
	 */
	router.get('/status', (req: express.Request, res: express.Response) => {
		let msg = "[" + new Date() + "] API is up! ";
		res.json({ msg: msg });
	});
	app.use(router);
};
