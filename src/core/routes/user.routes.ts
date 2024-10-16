import type { Hono } from "hono";
import UserController from "../modules/user/user.controller";
import { jwt } from "hono/jwt";
import Config from "../../app/config/config.app";

const userController = new UserController();
const secret = Config.secretPayload;

const userRouter = (app: Hono) => {
	app.get("/users", (c) => userController.getAllUsers(c));
	app.get("/user/:id", (c) => userController.getUserById(c));
	app.post("/user", (c) => userController.createUser(c));
	app.put("/user/:id", (c) => userController.updateUser(c));
	app.delete("/user/:id", (c) => userController.deleteUser(c));
	app.post("/user/login", (c) => userController.loginUser(c));
	app.get("/user/auth/me", jwt({ secret, alg: "HS256" }), (c) =>
		userController.getUserInformation(c),
	);
};
export default userRouter;
