import { AlmocoRepeticaoEntity } from "../../../common/entities/almoco.entitie";
import BaseRepository from "../../../common/utils/repository.utils";

export default class AdminRepositories extends BaseRepository<AlmocoRepeticaoEntity> {
	private static instance: AdminRepositories;
	private isSelling: boolean;

	private constructor() {
		super(AlmocoRepeticaoEntity);
		this.isSelling = false;
	}

	static getInstance() {
		if (!AdminRepositories.instance) {
			AdminRepositories.instance = new AdminRepositories();
		}
		return AdminRepositories.instance;
	}

	async ControlSelling(control: boolean) {
		this.isSelling = control;
	}

	async isSellingAllowed() {
		return this.isSelling;
	}
}
