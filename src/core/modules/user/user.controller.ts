import type { Context } from "hono";
import UserServices from "./user.services";
import QRCode from "qrcode";

export default class UserController {
	private userServices: UserServices;

	constructor() {
		this.userServices = new UserServices();
	}

	async getAllUsers(c: Context) {
		try {
			const page = Number(c.req.query("page")) || 1;
			const result = await this.userServices.getAllUsers(page);

			if (page > result.lastPage) {
				return c.json({ message: "Página inexistente" }, 404);
			}

			return c.json(result, 200);
		} catch (error) {
			return c.json({ message: "getAllUsers", error: error }, 500);
		}
	}

	async getUserById(c: Context) {
		const id = c.req.param("id");
		try {
			const user = await this.userServices.getUserById(Number(id));
			if (user) {
				return c.json(user, 200);
			}
			return c.json({ message: "User not found" }, 404);
		} catch (error) {
			return c.json({ message: "getUserById", error: error }, 500);
		}
	}

	async createUser(c: Context) {
		try {
			const userData = await c.req.json();
			const user = await this.userServices.createUser(userData);
			return c.json({ user }, 201);
		} catch (error) {
			return c.json({ message: "creatingUser", error }, 500);
		}
	}

	async updateUser(c: Context) {
		const id = c.req.param("id");
		try {
			const user = await c.req.json();
			const updatedUser = await this.userServices.updateUser(Number(id), user);
			return c.json(updatedUser, 200);
		} catch (error) {
			return c.json({ message: "updateUser", error: error }, 500);
		}
	}

	async deleteUser(c: Context) {
		const id = c.req.param("id");
		try {
			await this.userServices.deleteUser(Number(id));
			return c.text("User deleted", 204);
		} catch (error) {
			return c.json({ message: "deleteUser", error: error }, 500);
		}
	}

	async loginUser(c: Context) {
		try {
			const { userId, password } = await c.req.json();
			const { token, user } = await this.userServices.loginUser(
				Number(userId),
				password,
			);
			return c.json({ token, user }, 200);
		} catch (error) {
			console.log(error);
			return c.json({ message: "loginUser", error: error }, 500);
		}
	}
	async getUserInformation(c: Context) {
		const payload = c.get("jwtPayload");
		if (!payload) return c.json({ message: "Unauthorized" }, 401);

		try {
			const user = await this.userServices.getUserByUserId(payload.userId);
			if (!user) return c.json({ message: "Not found" }, 404);

			const qrData = {
				userId: user.userId,
				name: user.name,
				class: user.class,
				age: user.age,
			};
			const qrCode = await QRCode.toDataURL(JSON.stringify(qrData));

			return c.json({ message: "Authenticated", payload, user, qrCode }, 200);
		} catch (error) {
			return c.json({ message: "getUserInformation", error: error }, 500);
		}
	}
}
