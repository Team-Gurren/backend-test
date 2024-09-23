import type { Hono } from "hono";

import userRouter from "../../core/routes/user/user.routes";
import lunchRouter from "../../core/routes/lunch/lunch.route";

const handleRoutes = (app: Hono): void => {
	userRouter(app);
	lunchRouter(app);
};
export default handleRoutes;
