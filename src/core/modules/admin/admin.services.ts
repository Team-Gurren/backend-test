import AdminRepositories from "./admin.repositorie";

export default class AdminServices {
	private adminRepositories: AdminRepositories;

	constructor() {
		this.adminRepositories = AdminRepositories.getInstance();
	}

	async SellingControll(control: boolean) {
		await this.adminRepositories.ControlSelling(control);
	}

	async IsSelling() {
		return this.adminRepositories.isSellingAllowed();
	}
}
