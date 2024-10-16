import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class UserEntitie {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column("int", { unique: true })
	userId!: number;

	@Column("varchar")
	password!: string;

	@Column("varchar")
	name!: string;

	@Column("varchar")
	lastName!: string;

	@Column("int")
	age!: number;

	@Column("varchar")
	class!: string;
}
