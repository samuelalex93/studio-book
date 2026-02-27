import { Business } from "./business.entity";

export class CreateBusinessDTO {
  name!: string;
  description?: string | null;

  phone?: string | null;
  cnpj?: string | null;
  municipal_registration?: string | null;

  address!: string;

  business_type_id!: string;
  is_active?: boolean;

  cover_image?: string | null;
}

export class UpdateBusinessDTO {
  name?: string;
  description?: string | null;

  phone?: string | null;
  cnpj?: string | null;
  municipal_registration?: string | null;

  address?: string;

  business_type_id?: string;
  is_active?: boolean;

  cover_image?: string | null;
}

export class BusinessResponseDTO {
  id!: string;
  name!: string;
  description!: string | null;

  phone!: string | null;
  address!: string;
  cnpj!: string | null;
  municipal_registration!: string | null;

  business_type_id!: string;
  is_active!: boolean;
  cover_image!: string | null;

  owner_id!: string;

  created_at!: Date;
  updated_at!: Date;

  static fromEntity(business: Business): BusinessResponseDTO {
    const dto = new BusinessResponseDTO();

    dto.id = business.id;
    dto.name = business.name;
    dto.description = business.description;

    dto.phone = business.phone;
    dto.address = business.address;
    dto.cnpj = business.cnpj;
    dto.municipal_registration = business.municipal_registration;

    dto.business_type_id = business.business_type_id;
    dto.is_active = business.is_active;

    dto.cover_image = business.cover_image;

    dto.owner_id = business.owner_id;
    dto.created_at = business.created_at;
    dto.updated_at = business.updated_at;

    return dto;
  }
}