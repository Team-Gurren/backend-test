import type { Hono } from "hono";
import { cors } from "hono/cors";
import { prettyJSON } from "hono/pretty-json";

export const AppMiddleware = (app: Hono) => {
    app.use(cors({
        origin: "*",
        allowMethods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
        allowHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
        credentials: true
    }))
    app.use(prettyJSON())
}