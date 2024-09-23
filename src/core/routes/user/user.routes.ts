import type { Hono } from "hono";
import UserController from "../../modules/user/user.controller";

const userController = new UserController();

const userRouter = (app: Hono) => {
	app.get("/user/:id", (c) => userController.getUserById(c));
	app.post("/user", (c) => userController.createUser(c));
	app.put("/user/:id", (c) => userController.updateUser(c));
	app.delete("/user/:id", (c) => userController.deleteUser(c));
	app.post("/user/login", (c) => userController.loginUser(c));
};

export default userRouter;
