import type { Context } from "hono";
import LunchService from "./lunch.services";

export default class LunchController {
	private lunchService = new LunchService();

	async createLunch(c: Context) {
		const lunchData = await c.req.json();
		const userId = lunchData.id;
		try {
			const lunches = await this.lunchService.getAllLunches();
			let lunch = lunches[0];

			if (!lunch) {
				lunch = await this.lunchService.createLunch({
					name: "Lunch Name",
					reps: [{ id: userId, reps: 1 }],
				});
			} else {
				const existingRep = lunch.reps.find(
					(rep: { id: number }) => rep.id === userId,
				);
				if (existingRep) {
					existingRep.reps += 1;
				} else {
					lunch.reps.push({ id: userId, reps: 1 });
				}

				await this.lunchService.updateLunch(lunch.id, lunch);
			}

			return c.json(lunch, 201);
		} catch (error) {
			return c.json({ message: (error as Error).message }, 500);
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
}
