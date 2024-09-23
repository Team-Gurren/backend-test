import { DataSource } from "typeorm";
import { userModel } from "../models/userModel.app";
import { LunchModel } from "../models/lunchModel.app";

export const AppDataSource = new DataSource({
	type: "postgres",
	host: "localhost",
	port: 5432,
	username: "test",
	password: "test",
	database: "test",
	synchronize: true,
	logging: true,
	entities: [userModel, LunchModel],
	subscribers: [],
	migrations: [],
});
