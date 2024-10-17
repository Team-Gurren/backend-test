import { HTTPException } from "hono/http-exception";
import UserServices from "../user.services";

const services = new UserServices();

export async function ReadUser(data: number) {
	const user = await services.UserFind(data);
	if (user) {
		return user;
	}
	throw new HTTPException(404, { message: "User not found with the provided ID" });
}

export async function ReadUserByMatricula(data: number) {
	const user = await services.UserFindByMatricula(data);
	if (user) {
		return user;
	}
	throw new HTTPException(404, { message: "User not found with the provided matricula" });
}

export async function ReadUserByCPF(data: string) {
	const user = await services.UserFindByCPF(data);
	if (user) {
		return user;
	}
	throw new HTTPException(404, { message: "User not found with the provided CPF" });
}
