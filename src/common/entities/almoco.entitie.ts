import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { UserEntity } from "./user.entitie";

@Entity()
export class AlmocoRepeticaoEntity {
	@PrimaryGeneratedColumn()
	id!: number;

	@ManyToOne(() => UserEntity, user => user.repeticoes)
	user!: UserEntity;

	@Column("int")
	almocoId!: number;

	@Column("date")
	data!: Date;

	@Column("json")
	repeticoes!: { id: number; repeticoes: number }[];
}
