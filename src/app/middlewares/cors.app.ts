import type { Hono } from "hono";
import { cors } from "hono/cors";

import Config from "../config/config.app";

const corsMiddleware = (app: Hono) => {
	app.use(
		"*",
		cors({
			origin: Config.allowedHosts,
			allowMethods: ["GET", "HEAD", "PUT", "POST", "DELETE", "PATCH"],
		}),
	);
};

export default corsMiddleware;
