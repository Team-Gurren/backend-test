import type { EntityTarget, Repository, ObjectLiteral } from "typeorm";
import { AppDataSource } from "../handlers/handle.database";

export default abstract class BaseRepository<T extends ObjectLiteral> {
	protected repository: Repository<T>;

	constructor(private readonly entity: EntityTarget<T>) {
		this.repository = AppDataSource.getRepository(this.entity);
	}
}
