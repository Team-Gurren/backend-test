import { HTTPException } from "hono/http-exception";
import UserServices from "../user.services";
import { z } from "zod";
import type { UserUpdateDTO } from "../dto/update.user-dto";
import UserUpdateDTOType from "../dto/update.user-dto";
import UserDTOType from "../dto/user-dto";

export default async function UpdateUser(
	userId: number,
	body: Partial<UserUpdateDTO>,
) {
	const services = new UserServices();
	try {
		const user = await services.UserFindByMatricula(userId);
		console.log(user);

		if (user) {
			const validatedData = UserUpdateDTOType.parse(body);

			await services.UserUpdate(userId, validatedData);

			const updatedUser = await services.UserFindByMatricula(userId);
			return { message: "User updated", data: updatedUser };
		}

		throw new HTTPException(404, { message: "User not found" });
	} catch (error) {
		if (error instanceof z.ZodError) {
			throw new HTTPException(400, { message: `${error}` });
		}
		throw new HTTPException(500, {
			message: "Error updating user",
			cause: error,
		});
	}
}
