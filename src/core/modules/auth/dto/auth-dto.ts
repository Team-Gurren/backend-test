import { z } from "zod";

const AuthDTOType = z.object({
	userId: z.number().optional(),
	cpf: z.string().optional(),
	birthday: z.string(),
});

export default AuthDTOType;
export type AuthDTO = z.infer<typeof AuthDTOType>;
