import type { Hono } from "hono";
import Config from "../../app/config/config.app";
import AuthController from "../modules/auth/auth.controller";

const DefaultUrl = Config.defaultUrls.auth;

const AuthRouter = (app: Hono) => {
	const Controller = new AuthController();

	app.post(`${DefaultUrl}`, Controller.LoginUser.bind(Controller));
};
export default AuthRouter;
