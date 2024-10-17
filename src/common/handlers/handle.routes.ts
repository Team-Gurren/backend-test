import type { Hono } from "hono";

import UserRouter from "../../core/routes/user.routes";
import AuthRouter from "../../core/routes/auth.routes";

export const HandleRoutes = (app: Hono) => {
	UserRouter(app);
	AuthRouter(app);
};
