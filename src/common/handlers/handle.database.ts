import { DataSource } from "typeorm";
import { UserEntitie } from "../entities/user.entitie";

export const AppDataSource = new DataSource({
	type: "sqlite",
	database: "database.sqlite",
	synchronize: true,
	logging: true,
	entities: [UserEntitie],
});

export const HandleDatabase = () => {
	AppDataSource.initialize().then(() => {
		console.log("Database connected");
	}).catch((error) => {
		console.log(error);
	});
};
