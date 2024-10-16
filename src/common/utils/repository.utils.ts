import type { BaseEntity, Repository } from "typeorm";

export default abstract class BaseRepository<T extends BaseEntity> {
	protected readonly repository: Repository<T>;

	constructor(repository: Repository<T>) {
		this.repository = repository;
	}
}
