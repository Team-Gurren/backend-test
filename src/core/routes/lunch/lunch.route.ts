import type { Hono } from "hono";
import LunchController from "../../modules/lunch/lunch.controller";

const lunch = new LunchController();

const lunchRouter = (app: Hono) => {
	app
		.post("/lunch", lunch.createLunch.bind(lunch))
		.get("/lunch", lunch.getAllLunches.bind(lunch))
		.get("/lunch/:id", lunch.getLunchById.bind(lunch))
		.put("/lunch/:id", lunch.updateLunch.bind(lunch));

	return app;
};

export default lunchRouter;
