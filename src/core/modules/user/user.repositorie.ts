import { UserEntity } from "../../../common/entities/user.entitie";
import BaseRepository from "../../../common/utils/repository.utils";

import type { UserUpdateDTO } from "./dto/update.user-dto";
import type { UserDTO } from "./dto/user-dto";

export default class UserRepositories extends BaseRepository<UserEntity> {
	constructor() {
		super(UserEntity);
	}

	async FindUser(data: number): Promise<UserEntity | null> {
		return await this.repository.findOneBy({ id: data });
	}

	async FindUserByMatricula(data: number): Promise<UserEntity | null> {
		return await this.repository.findOneBy({ userId: data });
	}

	async FindUserByCpf(data: string): Promise<UserEntity | null> {
		return await this.repository.findOneBy({ cpf: data });
	}

	async UserCreate(data: UserDTO): Promise<UserEntity> {
		const user = this.repository.create(data);
		return await this.repository.save(user);
	}

	async DeleteUser(data: number) {
		return await this.repository.delete(data);
	}

	async UpdateUser(data: number, body: Partial<UserUpdateDTO>): Promise<UserEntity | null> {
		const user = await this.FindUserByMatricula(data);
		if (!user) throw new Error("User not found"); 
	
		Object.assign(user, body); 
	
		return await this.repository.save(user); 
	}
	
}
