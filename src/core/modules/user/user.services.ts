import type { userModel } from "../../../app/models/userModel.app";
import UserRepositories from "./user.repositorie";
import bcrypt from "bcrypt";
import { sign } from "jsonwebtoken";

export default class UserServices {
	private userRepositories: UserRepositories;

	constructor() {
		this.userRepositories = new UserRepositories();
	}

	async getUserById(id: number) {
		return await this.userRepositories.findUserById(id);
	}

	async createUser(userData: Partial<userModel>) {
		if (!userData.password) throw new Error("Password is required");
		const hashedPassword = await bcrypt.hash(userData.password, 2);
		userData.password = hashedPassword;

		return await this.userRepositories.createUser(userData);
	}

	async updateUser(id: number, userData: Partial<userModel>) {
		return await this.userRepositories.updateUser(id, userData);
	}

	async deleteUser(id: number) {
		return await this.userRepositories.deleteUser(id);
	}

	async loginUser(userId: number, password: string) {
		const user = await this.userRepositories.findUserByUserId(userId);
		if (!user) throw new Error("Not found");

		if (!user.password) throw new Error("Password is not set");

		const isPasswordValid = await bcrypt.compare(password, user.password);
		if (!isPasswordValid) throw new Error("Invalid");

		const token = sign({ userId: user.userId }, "secretKey", { expiresIn: "1h",});
		return { token, user };
	}
}
