import AdminRepositories from "./admin.repositorie";

export default class AdminServices {
	private adminRepositories: AdminRepositories;

	constructor() {
		this.adminRepositories = new AdminRepositories();
	}

	async SellingControll(control: boolean) {
		await this.adminRepositories.ControlSelling(control);
	}
}
