import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { AlmocoRepeticaoEntity } from "./almoco.entitie";

@Entity()
export class UserEntity {
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

	@OneToMany(() => AlmocoRepeticaoEntity, repeticao => repeticao.user)
	repeticoes!: AlmocoRepeticaoEntity[];
}
