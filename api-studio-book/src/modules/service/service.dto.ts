import { Service } from "./service.entity";

export class CreateServiceDTO {
  name!: string;
  description?: string | null;
  price!: number;
  duration_minutes!: number;
  category_id?: string | null;
  is_active?: boolean;
}

export class UpdateServiceDTO {
  name?: string;
  description?: string | null;
  price?: number;
  duration_minutes?: number;
  category_id?: string | null;
  is_active?: boolean;
}

export class ServiceResponseDTO {
  id!: string;
  name!: string;
  description!: string | null;
  price!: number;
  duration_minutes!: number;
  business_id!: string;
  category_id!: string | null;
  is_active!: boolean;
  created_at!: Date;
  updated_at!: Date;

  static fromEntity(service: Service): ServiceResponseDTO {
    const dto = new ServiceResponseDTO();
    dto.id = service.id;
    dto.name = service.name;
    dto.description = service.description;
    dto.price = service.price;
    dto.duration_minutes = service.duration_minutes;
    dto.business_id = service.business_id;
    dto.category_id = service.category_id;
    dto.is_active = service.is_active;
    dto.created_at = service.created_at;
    dto.updated_at = service.updated_at;
    return dto;
  }
}
