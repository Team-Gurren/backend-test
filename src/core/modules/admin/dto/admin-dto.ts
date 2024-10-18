import { z } from "zod";

export const AdminDTOType = z.object({
    login: z.string().optional(),
    password: z.string().optional(),
});

export const AlmocoDTOType = z.object({
    almoco: z.string().optional(),
    almocoRepeticao: z.string().optional(),
    userId: z.number(),
});

export type AdminDTO = z.infer<typeof AdminDTOType>;
export type AlmocoDTO = z.infer<typeof AlmocoDTOType>;