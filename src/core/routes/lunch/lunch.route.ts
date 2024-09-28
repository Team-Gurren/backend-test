import type { Context, Hono } from "hono";
import LunchController from "../../modules/lunch/lunch.controller";

const lunch = new LunchController();

const lunchRouter = (app: Hono) => {
	app.post("/lunch", lunch.createLunch.bind(lunch));
	app.get("/lunch", lunch.getAllLunches.bind(lunch));
	app.get("/lunch/:id", lunch.getLunchById.bind(lunch));
	app.put("/lunch/:id", lunch.updateLunch.bind(lunch));
};

export default lunchRouter;
