"use strict";

import * as express from 'express';
import logger from '../libs/logger';

export default (app: any) => {
	logger.info("Main route enabled");
	const router = express.Router();
	
	/**
	 * @swagger
	 * /:
	 *   get:
	 *     tags:
	 *       - main
	 *     description: Returns current date
	 *     produces:
	 *       - application/json
	 *     responses:
	 *       200:
	 *         description: A default message with the date
	 */
	router.get('/', (req: express.Request, res: express.Response) => {
		let msg = new Date() + "/ request";
		res.json({ msg: msg });
	});
	app.use(router);
};
