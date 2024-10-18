import { z } from "zod";

export const AlmocoDTOType = z.object({
	almoco: z.string().optional(),
	almocoRepeticao: z.string().optional(),
	userId: z.number(),
});

const SellingSchema = z.object({
	isSelling: z.boolean(),
});

export type AlmocoDTO = z.infer<typeof AlmocoDTOType>;
