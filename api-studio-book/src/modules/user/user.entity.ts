export enum UserRole {
  CLIENTE = "CLIENTE",
  BARBEIRO = "BARBEIRO",
  PROPRIETARIO = "PROPRIETARIO",
  GERENTE = "GERENTE",
  MEGAZORD = "MEGAZORD",
}

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: UserRole;
  business_id: string | null;
  cpf_cnpj?: string | null;
  avatar_image?: string | null;
  is_active?: boolean;
  refresh_token: string | null;
  created_at: Date;
  updated_at?: Date;
}

export type CreateUserInput = Omit<
  User,
  "id" | "created_at" | "updated_at" | "refresh_token"
> & {
  refresh_token?: string | null;
};

export type UpdateUserInput = Partial<Omit<User, "id" | "created_at" | "updated_at" | "role">> & {
  role?: UserRole;
};

export type UserResponse = Omit<User, "password" | "refresh_token">;
