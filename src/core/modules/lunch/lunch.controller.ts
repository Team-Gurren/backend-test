import type { Context } from "hono";
import LunchService from "./lunch.services";

export default class LunchController {
	private lunchService = new LunchService();

	async createLunch(c: Context) {
		const lunchData = await c.req.json();
		try {
			const lunch = await this.lunchService.createLunch(lunchData);
			return c.json(lunch, 201);
		} catch (error) {
			return c.json({ message: error }, 500);
		}
	}

	async getAllLunches(c: Context) {
		try {
			const lunches = await this.lunchService.getAllLunches();
			return c.json(lunches);
		} catch (error) {
			return c.json({ message: error }, 500);
		}
	}

	async getLunchById(c: Context) {
		const { id } = c.req.param();
		try {
			const lunch = await this.lunchService.getLunchById(Number(id));
			if (!lunch) {
				return c.json({ message: "Lunch not found" }, 404);
			}
			return c.json(lunch);
		} catch (error) {
			return c.json({ message: error }, 500);
		}
	}

	async updateLunch(c: Context) {
		const { id } = c.req.param();
		const lunchData = await c.req.json();
		try {
			const updatedLunch = await this.lunchService.updateLunch(
				Number(id),
				lunchData,
			);
			if (!updatedLunch) {
				return c.json({ message: "Lunch not found" }, 404);
			}
			return c.json(updatedLunch);
		} catch (error) {
			return c.json({ message: error }, 500);
		}
	}

	async deleteLunch(c: Context) {
		const { id } = c.req.param();
		try {
			await this.lunchService.deleteLunch(Number(id));
			return c.text("deleted", 204);
		} catch (error) {
			return c.json({ message: error }, 500);
		}
	}
}
