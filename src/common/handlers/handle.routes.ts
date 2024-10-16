import type { Hono } from "hono";

import userRouter from "../../core/routes/user.routes";

export const HandleRoutes = (app: Hono) => {
	userRouter(app);
};
