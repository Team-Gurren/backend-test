import type { Context } from "hono";
import LunchService from "./lunch.services";

export default class LunchController {
	private lunchService = new LunchService();

	async createLunch(c: Context) {
		const lunchData = await c.req.json();
		const userId = lunchData.id;
		const now = new Date();
		const dateNow = now.toISOString().split("T")[0];

		try {
			const lunches = await this.lunchService.getAllLunches();
			console.log(dateNow);

			const existingLunchToday = lunches.find((lunch) => {
				const lunchDate = new Date(lunch.date);
				return lunchDate.toISOString().split("T")[0] === dateNow;
			});

			// biome-ignore lint/suspicious/noImplicitAnyLet: <explanation>
			let lunch;

			if (!existingLunchToday) {
				lunch = await this.lunchService.createLunch({
					name: "Lunch Name",
					date: now,
					reps: [{ id: userId, reps: 1 }],
				});
			} else {
				lunch = existingLunchToday;
				const existingRep = lunch.reps.find((rep) => rep.id === userId);

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
