import UserRepositories from "./user.repositorie";
import bcrypt from "bcrypt";
import { Jwt } from "hono/utils/jwt";
import Config from "../../../app/config/config.app";
import type { UserEntity } from "../../../common/entities/user.entitie";

export default class UserServices {
	private userRepositories: UserRepositories;

	constructor() {
		this.userRepositories = new UserRepositories();
	}

	async getAllUsers(page: number) {
		return await this.userRepositories.findAllUsers(page);
	}

	async getUserById(id: number) {
		return await this.userRepositories.findUserById(id);
	}

	async getUserByUserId(userId: number) {
		return await this.userRepositories.findUserByUserId(userId);
	}

	async createUser(userData: Partial<UserEntity>) {
		if (!userData.password) throw new Error("Password is required");
		const hashedPassword = await bcrypt.hash(userData.password, 2);
		userData.password = hashedPassword;

		return await this.userRepositories.createUser(userData);
	}

	async updateUser(id: number, userData: Partial<UserEntity>) {
		return await this.userRepositories.updateUser(id, userData);
	}

	async deleteUser(id: number) {
		return await this.userRepositories.deleteUser(id);
	}

	async loginUser(userId: number, password: string) {
		const user = await this.userRepositories.findUserByUserId(userId);
		if (!user) throw new Error("User not found");

		const isPasswordValid = await bcrypt.compare(password, user.password);
		if (!isPasswordValid) throw new Error("Invalid password");

		const token = await Jwt.sign({ userId: user.userId }, Config.secretPayload);

		return { token, user };
	}
}
