import { z } from "zod"

export const createUserSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(6),
  role: z.enum(["CLIENTE", "BARBEIRO", "PROPRIETARIO", "GERENTE", "MEGAZORD"]),
  business_id: z.string().uuid().optional().nullable(),
  cpf_cnpj: z.string().optional().nullable(),
  avatar_image: z.string().url().optional().nullable(),
});