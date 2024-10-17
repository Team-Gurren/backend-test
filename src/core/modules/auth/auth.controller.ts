import type { Context } from "hono";
import LoginUser from "./use-cases/login.auth";

export default class AuthController {
	public async LoginUser(c: Context): Promise<Response> {
		const body = await c.req.json();
		const user = await LoginUser(body);
		return c.json({ user }, 200);
	}
}
