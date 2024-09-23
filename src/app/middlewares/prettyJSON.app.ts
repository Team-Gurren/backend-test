import type { Hono } from "hono";
import { prettyJSON } from "hono/pretty-json";

const preetyJsonMiddleware = (app: Hono): void => {
	app.use("*", prettyJSON({ space: 4 }));
};

export default preetyJsonMiddleware;
