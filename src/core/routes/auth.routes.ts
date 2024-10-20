import type { Hono } from "hono";
import Config from "../../app/config/config.app";
import AuthController from "../modules/auth/auth.controller";

const DefaultUrl = Config.defaultUrls.auth;

const AuthRouter = (app: Hono) => {
	const Controller = new AuthController();

	app.post(`${DefaultUrl}`, Controller.LoginUserWithMatricula.bind(Controller));
	app.post(`${DefaultUrl}/cpf`, Controller.LoginUserWithCPF.bind(Controller));
};
export default AuthRouter;
