import { HTTPException } from "hono/http-exception";
import AuthServices from "../auth.services";
import UserServices from "../../user/user.services";

export async function LoginUserWithMatricula(data: { userId: number, birthday: string }) {
	const authServices = new AuthServices();
	const userServices = new UserServices();

	try {
		const user = await userServices.UserFindByMatricula(data.userId);
		if (!user) {
			throw new HTTPException(404, { message: "User not found" });
		}

		if (data.birthday !== user.birthday) {
			throw new HTTPException(401, { message: "Invalid credentials" });
		}

		const jwt = await authServices.Login(data.userId);
		return { message: "Login successful", data: jwt };
	} catch (error) {
		if (error instanceof HTTPException) {
			throw new HTTPException(500, {
				message: "Internal server error",
				cause: error,
			});
		}
		throw new HTTPException(500, {
			message: "Internal server error",
			cause: error,
		});
	}
}

export async function LoginUserWithCPF(data: { cpf: string, birthday: string }) {
	const authServices = new AuthServices();
	const userServices = new UserServices();

	try {
		const user = await userServices.UserFindByCPF(data.cpf);
		if (!user) {
			throw new HTTPException(404, { message: "User not found" });
		}

		if (data.birthday !== user.birthday) {
			throw new HTTPException(401, { message: "Invalid credentials" });
		}

		const jwt = await authServices.Login(user.userId);	
		return { message: "Login successful", data: jwt };
	} catch (error) {
		console.log(error)
		if (error instanceof HTTPException) {
			throw new HTTPException(500, {
				message: `${error}`,
			});
		}
		throw new HTTPException(500, {
			message: "Internal server error",
			cause: error,
		});
	}
}