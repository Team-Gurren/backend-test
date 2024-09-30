import type { Hono } from "hono";
import { jwt } from "hono/jwt";
import UserController from "../../modules/user/user.controller";
import Config from "../../../app/config/config.app";

const userController = new UserController();
const secret = Config.secretPayload;

const userRouter = (app: Hono) => {
	app
		.get("/users", (c) => userController.getAllUsers(c))
		.get("/user/:id", (c) => userController.getUserById(c))
		.post("/user", (c) => userController.createUser(c))
		.put("/user/:id", (c) => userController.updateUser(c))
		.delete("/user/:id", (c) => userController.deleteUser(c))
		.post("/user/login", (c) => userController.loginUser(c))
		.get("/user/auth/me", jwt({ secret, alg: "HS256" }), (c) =>
			userController.getUserInformation(c),
		);
	return app; 
};

export default userRouter;
