import type { UserEntity } from "../../../common/entities/user.entitie";
import UserRepositories from "./user.repositorie";

import type { UserUpdateDTO } from "./dto/update.user-dto";
import type { UserDTO } from "./dto/user-dto";

export default class UserServices {
	private UserRepositories: UserRepositories;

	constructor() {
		this.UserRepositories = new UserRepositories();
	}

	async UserFind(data: number): Promise<UserEntity | null> {
		return await this.UserRepositories.FindUser(data);
	}

	async UserFindByMatricula(data: number): Promise<UserEntity | null> {
		return await this.UserRepositories.FindUserByMatricula(data);
	}

	async UserFindByCPF(data: string): Promise<UserEntity | null> {
		return await this.UserRepositories.FindUserByCpf(data);
	}

	async UserCreate(data: UserDTO): Promise<UserEntity> {
		return await this.UserRepositories.UserCreate(data);
	}

	async UserDelete(data: number): Promise<string> {
		await this.UserRepositories.DeleteUser(data);
		return "User deleted";
	}

	async UserUpdate(data: number, body: Partial<UserUpdateDTO>) {
		return await this.UserRepositories.UpdateUser(data, body);
	}
}
