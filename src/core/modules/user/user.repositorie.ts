import { UserEntity } from "../../../common/entities/user.entitie";
import { AppDataSource } from "../../../common/handlers/handle.database";

export default class UserRepositories {
	private userRepository = AppDataSource.getRepository(UserEntity);

	async findAllUsers(page: number) {
		const perPage = 10;
		const skip = (page - 1) * perPage;

		const [users, total] = await this.userRepository.findAndCount({
			skip: skip,
			take: perPage,
		});

		const lastPage = Math.ceil(total / perPage);

		return {
			data: users.map((user) => ({
				userId: user.userId,
				name: user.name,
				lastname: user.lastName,
				age: user.age,
				class: user.class,
			})),
			total: total,
			page: page,
			lastPage: lastPage,
		};
	}

	async findUserById(id: number) {
		return await this.userRepository.findOneBy({ id });
	}

	async findUserByUserId(userId: number) {
		return await this.userRepository.findOneBy({ userId });
	}

	async createUser(userData: Partial<UserEntity>) {
		const user = this.userRepository.create(userData);
		return await this.userRepository.save(user);
	}

	async updateUser(id: number, userData: Partial<UserEntity>) {
		await this.userRepository.update(id, userData);
		return this.findUserById(id);
	}

	async deleteUser(id: number) {
		return await this.userRepository.delete(id);
	}
}
