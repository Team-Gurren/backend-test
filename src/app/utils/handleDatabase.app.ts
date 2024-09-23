import { AppDataSource } from "../database/database.app";

const handleDatabse = (): void => {
	AppDataSource.initialize()
		.then(() => {
			console.log("Database connected");
		})
		.catch((error) => {
			console.log(error);
		});
};
export default handleDatabse;
