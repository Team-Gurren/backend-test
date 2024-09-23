import type { Hono } from "hono";

const lunchRouter = (app: Hono) => {
	app.get("/lunch", async (c) => {
		return c.json({
			lunch: "lunch",
			lunch2: "lunch2",
			lunch3: "lunch3",
		});
	});
};

export default lunchRouter;
