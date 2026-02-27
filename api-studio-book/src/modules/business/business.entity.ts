export interface Business {
  id: string;
  name: string;
  description: string | null;
  phone: string | null;
  address: string;
  cnpj: string | null;
  municipal_registration: string | null;
  is_active: boolean;
  cover_image: string | null;
  owner_id: string;
  business_type_id: string;
  created_at: Date;
  updated_at: Date;
}

export type CreateBusinessInput = Omit<
  Business,
  "id" | "created_at" | "updated_at"
>;

export type UpdateBusinessInput = Partial<
  Omit<
    Business,
    "id" | "created_at" | "updated_at" | "owner_id"
  >
>;

export type BusinessResponse = Business;