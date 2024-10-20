import type { Context } from "hono";
import {
	LoginUserWithCPF,
	LoginUserWithMatricula,
} from "./use-cases/login.auth";

export default class AuthController {
	public async LoginUserWithMatricula(c: Context): Promise<Response> {
		const body = await c.req.json();
		const user = await LoginUserWithMatricula(body);
		return c.json({ user }, 200);
	}

	public async LoginUserWithCPF(c: Context): Promise<Response> {
		const body = await c.req.json();
		const user = await LoginUserWithCPF(body);
		return c.json({ user }, 200);
	}
}
