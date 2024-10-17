import type { UserDTO } from "../dto/user-dto";
import UserDTOType from "../dto/user-dto";
import UserServices from "../user.services";
import { HTTPException } from "hono/http-exception";
import { z } from "zod";

export default async function CreateUser(data: UserDTO) {
	const Services = new UserServices();
	try {
		const body = UserDTOType.parse({
			userId: data.userId,
			cpf: data.cpf,
			birthday: data.birthday,
			name: data.name,
			age: data.age,
			class: data.class,
		});

		const user = await Services.UserCreate(body);
		return { message: "User created", data: user };
	} catch (error) {
		if (error instanceof z.ZodError) {
			throw new HTTPException(400, { message: `${error}` });
		}

		throw new HTTPException(401, { message: "Error", cause: error });
	}
}
