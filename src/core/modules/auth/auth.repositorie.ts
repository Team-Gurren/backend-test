import { AssignJwt } from "../../../common/middlewares/auth.middleware";
import UserRepositories from "../user/user.repositorie";

export default class AuthRepositories extends UserRepositories {
	async Login(data: number) {
		const jwt = await AssignJwt(data);
		return { jwt };
	}
}
