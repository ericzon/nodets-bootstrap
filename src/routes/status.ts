"use strict";

import * as express from 'express';

export default (app: any) => {
	console.log("Status route enabled");
	const router = express.Router();
	router.get('/status', (req: express.Request, res: express.Response) => {
		let msg = "[" + new Date() + "] API is up! ";
		console.log(msg);
		res.json({ msg: msg });
	});
	app.use(router);
};
