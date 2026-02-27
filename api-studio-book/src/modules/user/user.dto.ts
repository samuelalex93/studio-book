import { User, UserRole } from "./user.entity";

export class CreateUserDTO {
  name!: string;
  email!: string;
  password!: string;
  role: UserRole = UserRole.CLIENTE;
  business_id?: string | null;
  cpf_cnpj?: string | null;
  avatar_image?: string | null;
  is_active: boolean | undefined;
}

export class UpdateUserDTO {
  name?: string;
  email?: string;
  password?: string;
  role?: UserRole;
  business_id?: string | null;
  cpf_cnpj?: string | null;
  avatar_image?: string | null;
  is_active?: boolean;
}

export class UserResponseDTO {
  id!: string;
  name!: string;
  email!: string;
  role!: UserRole;
  business_id!: string | null;
  created_at!: Date;

  static fromEntity(user: User): UserResponseDTO {
    const dto = new UserResponseDTO();
    dto.id = user.id;
    dto.name = user.name;
    dto.email = user.email;
    dto.role = user.role;
    dto.business_id = user.business_id;
    dto.created_at = user.created_at;
    return dto;
  }
}
