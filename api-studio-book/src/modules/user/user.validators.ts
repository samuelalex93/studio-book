
import { z } from "zod";
import { UserRole } from "./user.entity";

export const createUserSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z
    .enum([
      UserRole.CLIENTE,
      UserRole.BARBEIRO,
      UserRole.PROPRIETARIO,
      UserRole.GERENTE,
      UserRole.MEGAZORD,
    ])
    .optional()
    .default(UserRole.CLIENTE),
  business_id: z.string().uuid("Invalid business ID").optional().nullable(),
  cpf_cnpj: z.string().optional().nullable(),
  avatar_image: z.string().url("Invalid URL").optional().nullable(),
});

export const updateUserSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters").optional(),
  email: z.string().email("Invalid email address").optional(),
  password: z.string().min(6, "Password must be at least 6 characters").optional(),
  role: z
    .enum([
      UserRole.CLIENTE,
      UserRole.BARBEIRO,
      UserRole.PROPRIETARIO,
      UserRole.GERENTE,
      UserRole.MEGAZORD,
    ])
    .optional(),
  business_id: z.string().uuid("Invalid business ID").optional().nullable(),
  cpf_cnpj: z.string().optional().nullable(),
  avatar_image: z.string().url("Invalid URL").optional().nullable(),
  is_active: z.boolean().optional(),
});

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export const registerSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export function validateUserRequest(data: any) {
  try {
    return createUserSchema.parse(data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new Error(error?.issues?.[0].message);
    }
    throw error;
  }
}
