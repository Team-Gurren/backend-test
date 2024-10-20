import UserServices from "../user.services";
import { HTTPException } from "hono/http-exception";
import QRCode from "qrcode";

export default async function ProfileUser(data: number) {
	const Services = new UserServices();
	try {
		const user = await Services.UserFindByMatricula(data);
		if (user) {
			const qrcode = await QRCode.toDataURL(user.userId.toString());
			return {
				user,
				qrcode,
			};
		}

		throw new HTTPException(404, {
			message: "User not found with the provided matricula",
		});
	} catch (error) {
		throw new HTTPException(404, {
			message: "User not found with the provided ID",
		});
	}
}
