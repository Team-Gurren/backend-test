import { AlmocoRepeticaoEntity } from "../../../common/entities/almoco.entitie";
import BaseRepository from "../../../common/utils/repository.utils";

export default class AdminRepositories extends BaseRepository<AlmocoRepeticaoEntity> {
	constructor() {
		super(AlmocoRepeticaoEntity);
	}
}
