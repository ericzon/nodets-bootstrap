"use strict";

import * as express from 'express';

export default (app: any) => {
	console.log("Secondary routes enabled");
	const router = express.Router();
	router.get('/secondary', (req: express.Request, res: express.Response) => {
		let msg = new Date() + "/ request";
		console.log("/secondary ",msg);
		res.json({ msg: msg });
	});
	app.use(router);
};
