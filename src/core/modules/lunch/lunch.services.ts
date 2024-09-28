import type { LunchModel } from "../../../app/models/lunchModel.app";
import LunchRepositories from "./lunch.repositorie";

export default class LunchService {
	private lunchRepository = new LunchRepositories();

	async createLunch(lunchData: Partial<LunchModel>): Promise<LunchModel> {
		return await this.lunchRepository.createLunch(lunchData);
	}

	async getAllLunches(): Promise<LunchModel[]> {
		return await this.lunchRepository.getAllLunches();
	}

	async getLunchById(id: number): Promise<LunchModel | null> {
		return await this.lunchRepository.getLunchById(id);
	}

	async updateLunch(
		id: number,
		lunchData: Partial<LunchModel>,
	): Promise<LunchModel | null> {
		return await this.lunchRepository.updateLunch(id, lunchData);
	}

	async deleteLunch(id: number): Promise<void> {
		await this.lunchRepository.deleteLunch(id);
	}
}
