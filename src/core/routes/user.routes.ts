import type { Hono } from "hono";
import UserController from "../modules/user/user.controller";
import Config from "../../app/config/config.app";
import { AuthMiddleware } from "../../common/middlewares/auth.middleware";

const DefaultUrl = Config.defaultUrls.user;

const UserRouter = (app: Hono) => {
    const Controller = new UserController();

    app.post(`${DefaultUrl}`, Controller.CreateUser.bind(Controller));
    app.delete(`${DefaultUrl}`, Controller.DeleteUser.bind(Controller));
    app.get(`${DefaultUrl}`, Controller.FindUser.bind(Controller));
    app.patch(`${DefaultUrl}`, Controller.UpdateUser.bind(Controller));
    
    app.get(`${DefaultUrl}/profile`, AuthMiddleware(app), Controller.ProfileUser.bind(Controller));
};

export default UserRouter;
