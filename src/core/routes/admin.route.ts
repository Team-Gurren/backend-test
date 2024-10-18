import type { Hono } from "hono";
import Config from "../../app/config/config.app";
import { AuthAdminMiddleware } from "../../common/middlewares/auth.middleware";
import AdminController from "../modules/admin/admin.controller";

const DefaultUrl = Config.defaultUrls.admin;

const AdminRouter = (app: Hono) => {
	AuthAdminMiddleware(app);
	const Controller = new AdminController();

	app.get(`${DefaultUrl}`, (c) => {
		return c.json({
			message: "Admin",
		});
	});
	app.get(`${DefaultUrl}/control`, Controller.ControlAdminSelling.bind(Controller))
};
export default AdminRouter;
