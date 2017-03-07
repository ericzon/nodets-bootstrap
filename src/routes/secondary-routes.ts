"use strict";

import * as express from 'express';

export default (app: any) => {
	console.log("Secondary routes enabled");
	const router = express.Router();
	router.get('/secondary', (req: express.Request, res: express.Response) => {
		console.log("GET 2 -> ",express);
		let msg = new Date() + "/ request";
		console.log(msg);
		res.json({ msg: msg });
	});
	app.use(router);
};
