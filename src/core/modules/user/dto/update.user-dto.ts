import { z } from "zod";

const UserUpdateDTOType = z.object({
	name: z.string().optional(),
	age: z.number().optional(),
	class: z.string().optional(),
});

export default UserUpdateDTOType;
export type UserUpdateDTO = z.infer<typeof UserUpdateDTOType>;
