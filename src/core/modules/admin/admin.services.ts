import AdminRepositories from "./admin.repositorie";

export default class AdminServices {
	private adminRepositories: AdminRepositories;

	constructor() {
		this.adminRepositories = new AdminRepositories();
	}
}
