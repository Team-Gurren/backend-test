import { DataSource } from "typeorm";
import { userModel } from "../models/userModel.app";
import { LunchModel } from "../models/lunchModel.app";

export const AppDataSource = new DataSource({
	type: "sqlite",
	database: "./my-database.sqlite",
	synchronize: true,
	logging: true,
	entities: [userModel, LunchModel],
	subscribers: [],
	migrations: [],
});
