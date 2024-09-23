import { AppDataSource } from "../../../app/database/database.app";
import { userModel } from "../../../app/models/userModel.app";

export default class UserRepositories {
	private userRepository = AppDataSource.getRepository(userModel);

	async findUserById(id: number) {
		return await this.userRepository.findOneBy({ id });
	}

	async findUserByUserId(userId: number) {
		return await this.userRepository.findOneBy({ userId });
	}

	async createUser(userData: Partial<userModel>) {
		const user = this.userRepository.create(userData);
		return await this.userRepository.save(user);
	}

	async updateUser(id: number, userData: Partial<userModel>) {
		await this.userRepository.update(id, userData);
		return this.findUserById(id);
	}

	async deleteUser(id: number) {
		return await this.userRepository.delete(id);
	}
}
