"use strict";

import * as express from 'express';

export default (app: any) => {
	console.log("Main route enabled");
	const router = express.Router();
	router.get('/', (req: express.Request, res: express.Response) => {
		let msg = new Date() + "/ request";
		console.log("/ ",msg);
		res.json({ msg: msg });
	});
	app.use(router);
};
