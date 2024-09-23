import { serve } from "@hono/node-server";
import { Hono } from "hono";
import Config from "./config/config.app";
import handleRoutes from "./utils/handleRoute.app";
import handleDatabse from "./utils/handleDatabase.app";
import corsMiddleware from "./middlewares/cors.app";
import preetyJsonMiddleware from "./middlewares/prettyJSON.app";

export const app = new Hono();

export default function handleServer(): void {
	const port = Config.port;
	console.log(`Server is running on port ${port}`);

	handleRoutes(app);
	handleDatabse();

	corsMiddleware(app);
	preetyJsonMiddleware(app);

	serve({
		fetch: app.fetch,
		port: port,
	});
}
