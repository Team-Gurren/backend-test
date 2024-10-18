import type { Hono } from "hono";
import Config from "../../app/config/config.app";
import AuthController from "../modules/auth/auth.controller";
import { AuthAdminMiddleware } from "../../common/middlewares/auth.middleware";

const DefaultUrl = Config.defaultUrls.admin;

const AdminRouter = (app: Hono) => {
    AuthAdminMiddleware(app)
    
    app.get(`${DefaultUrl}`, (c) => {
        return c.json({
            message: "Admin",
        });
    });
};
export default AdminRouter;
