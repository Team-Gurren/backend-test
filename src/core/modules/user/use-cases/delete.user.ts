import { HTTPException } from "hono/http-exception";
import UserServices from "../user.services";

export default async function DeleteUser(data: number) {
	const Services = new UserServices();
	try {
		const user = await Services.UserFind(data);
		if (user) {
			await Services.UserDelete(data);
			return { message: "User deleted" };
		}
		return { message: "User not found" };
	} catch (error) {
		throw new HTTPException(401, { message: "Error", cause: error });
	}
}
