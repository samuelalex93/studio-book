import { z } from "zod";

export const createBusinessSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  description: z.string().optional().nullable(),
  address: z.string().min(5, "Address must be at least 5 characters"),
  phone: z.string().min(8, "Phone must be at least 8 characters").optional().nullable(),
  cnpj: z.string().min(11).max(20).optional().nullable(),
  municipal_registration: z.string().max(50).optional().nullable(),
  business_type_id: z.string().uuid(),
  cover_image: z.string().max(500).optional().nullable(),
  is_active: z.boolean().optional(),
});

export const updateBusinessSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters").optional(),
  description: z.string().optional().nullable(),
  address: z.string().min(5, "Address must be at least 5 characters").optional(),
  phone: z.string().min(8, "Phone must be at least 8 characters").optional().nullable(),
  cnpj: z.string().min(11).max(20).optional().nullable(),
  municipal_registration: z.string().max(50).optional().nullable(),
  business_type_id: z.string().uuid().optional(),
  cover_image: z.string().max(500).optional().nullable(),
  is_active: z.boolean().optional(),
});
