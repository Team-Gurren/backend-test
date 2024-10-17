import { Entity, Column, PrimaryGeneratedColumn, OneToMany, Index } from "typeorm";
import { AlmocoRepeticaoEntity } from "./almoco.entitie";

@Entity()
export class UserEntity {
	// Row ID
	@PrimaryGeneratedColumn()
	id!: number;

	// Matricula
	@Index()
	@Column("int", { unique: true })
	userId!: number;

	// CPF
	@Index() 
	@Column("varchar", { unique: true }) 
	cpf!: string;

	// Birthday
	@Column("varchar")
	birthday!: string;

	// Nome do aluno
	@Column("varchar")
	name!: string;

	// Idade do aluno
	@Column("int")
	age!: number;

	// Turma do aluno
	@Column("varchar")
	class!: string;

	// Relacionamento almoço -> aluno
	@OneToMany(
		() => AlmocoRepeticaoEntity,
		(repeticao) => repeticao.user,
	)
	repeticoes!: AlmocoRepeticaoEntity[];
}
