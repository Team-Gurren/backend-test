import { DataSource } from "typeorm";
import { UserEntity } from "../entities/user.entitie";
import { AlmocoRepeticaoEntity } from "../entities/almoco.entitie";

export const AppDataSource = new DataSource({
	type: "sqlite",
	database: "database.sqlite",
	synchronize: true,
	logging: true,
	entities: [UserEntity, AlmocoRepeticaoEntity],
});

export const HandleDatabase = () => {
	AppDataSource.initialize().then(() => {
		console.log("Database connected");
	}).catch((error) => {
		console.log(error);
	});
};
