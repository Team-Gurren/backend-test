import { serve } from "@hono/node-server";
import { Hono } from "hono";
import Config from "./config/config.app";
import { AppMiddleware } from "../common/middlewares/app.middleware";
import { HandleRoutes } from "../common/handlers/handle.routes";
import { HandleDatabase } from "../common/handlers/handle.database";

export const app = new Hono();
const port = Config.port;

export default function handleServer(): void {
	AppMiddleware(app);
	HandleRoutes(app);
	HandleDatabase();

	serve({
		fetch: app.fetch,
		port: port,
	});
	console.log(`Server is running on port ${port}`);
}
