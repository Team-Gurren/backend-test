import { AlmocoRepeticaoEntity } from "../../../common/entities/almoco.entitie";
import BaseRepository from "../../../common/utils/repository.utils";

export default class AdminRepositories extends BaseRepository<AlmocoRepeticaoEntity> {
	private isSelling: boolean;

	constructor() {
		super(AlmocoRepeticaoEntity);
		this.isSelling = false;
	}

	async ControlSelling(control: boolean) {
		this.isSelling = control;
	}

	isSellingAllowed(): boolean {
		return this.isSelling;
	}
}
