import { AppDataSource } from "../../../app/database/database.app";
import { LunchModel } from "../../../app/models/lunchModel.app";

export default class LunchRepositories {
	private lunchRepository = AppDataSource.getRepository(LunchModel);

	async createLunch(lunchData: Partial<LunchModel>): Promise<LunchModel> {
		const lunch = this.lunchRepository.create(lunchData);
		return await this.lunchRepository.save(lunch);
	}

	async getAllLunches(): Promise<LunchModel[]> {
		return await this.lunchRepository.find();
	}

	async getLunchById(id: number): Promise<LunchModel | null> {
		return await this.lunchRepository.findOneBy({ id });
	}

	async updateLunch(
		id: number,
		lunchData: Partial<LunchModel>,
	): Promise<LunchModel | null> {
		await this.lunchRepository.update(id, lunchData);
		return this.getLunchById(id);
	}

	async deleteLunch(id: number): Promise<void> {
		await this.lunchRepository.delete(id);
	}
}
