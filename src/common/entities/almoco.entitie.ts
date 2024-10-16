import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class AlmocoEntitie {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column("varchar")
	name!: string;

	@Column("json")
	reps!: { id: number; reps: number }[];
}
