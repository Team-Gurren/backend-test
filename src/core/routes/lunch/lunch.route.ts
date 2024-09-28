import type { Hono } from "hono";
import LunchController from "../../modules/lunch/lunch.controller";

const lunchRouter = (app: Hono) => {
	const lunch = new LunchController();

	app.post("/lunch", lunch.createLunch.bind(lunch));
	app.get("/lunch", lunch.getAllLunches.bind(lunch));
	app.get("/lunch/:id", lunch.getLunchById.bind(lunch));
	app.put("/lunch/:id", lunch.updateLunch.bind(lunch));
};

export default lunchRouter;
