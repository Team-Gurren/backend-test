import { z } from "zod";

const UserDTOType = z.object({
	userId: z.number(),
	cpf: z.string(),
	birthday: z.string(),
	name: z.string(),
	age: z.number(),
	class: z.string(),
});
export default UserDTOType;
export type UserDTO = z.infer<typeof UserDTOType>;
