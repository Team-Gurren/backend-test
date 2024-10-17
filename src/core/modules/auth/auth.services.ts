import AuthRepositories from "./auth.repositorie";

export default class AuthServices {
	private authRepositories: AuthRepositories;

	constructor() {
		this.authRepositories = new AuthRepositories();
	}

	async Login(data: number) {
		return this.authRepositories.Login(data);
	}
}
