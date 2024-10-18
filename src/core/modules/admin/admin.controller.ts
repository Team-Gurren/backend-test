import type { Context } from "hono";
import { ControlAdminSelling } from "./use-cases/controll.admin";
import { VendingAdmin } from "./use-cases/vending.admin";

export default class AdminController {
	public async ControlAdminSelling(c: Context): Promise<Response> {
		const body = await c.req.query("control");
		const control = body === "true";
		const result = await ControlAdminSelling(control);
		return c.json(result);
	}

	public async IsSelling(c: Context): Promise<Response> {
		const result = await VendingAdmin();
		return c.json(result);
	}
}
