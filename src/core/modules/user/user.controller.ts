import type { Context } from "hono";
import CreateUser from "./use-cases/create.user";
import DeleteUser from "./use-cases/delete.user";
import { ReadUserByMatricula } from "./use-cases/read.user";
import UpdateUser from "./use-cases/update.user";

export default class UserController {
	public async CreateUser(c: Context): Promise<Response> {
		const body = await c.req.json();
		const user = await CreateUser(body);
		return c.json({ user });
	}

	public async DeleteUser(c: Context): Promise<Response> {
		const data = Number(c.req.query("id"));
		const user = await DeleteUser(data);
		return c.json({ user });
	}

	public async FindUser(c: Context): Promise<Response> {
		const data = Number(c.req.query("matricula"));
		const user = await ReadUserByMatricula(data);
		return c.json({ user });
	}

	public async UpdateUser(c: Context): Promise<Response> {
		const data = Number(c.req.query("matricula"));
		const body = await c.req.json();
		const user = await UpdateUser(data, body);
		return c.json({ user });
	}
	
}
