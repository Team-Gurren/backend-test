import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { UserEntity } from "./user.entitie";

@Entity()
export class AlmocoRepeticaoEntity {
	// row id
	@PrimaryGeneratedColumn()
	id!: number;

	// relacionemtno almoco -> aluno
	@ManyToOne(
		() => UserEntity,
		(user) => user.repeticoes,
	)
	user!: UserEntity;

	// almoco id
	@Column("int")
	almocoId!: number;

	// data
	@Column("date")
	data!: Date;
	
	// repeticoes
	@Column("json")
	repeticoes!: { id: number; repeticoes: number }[];
}
