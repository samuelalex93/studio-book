export interface BusinessType {
  id: string;
  name: string;
  description: string | null;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface BusinessAddress {
  id: string;
  business_id: string;
  street: string;
  number: string;
  complement: string | null;
  city: string;
  state: string;
  postal_code: string | null;
  latitude: number | null;
  longitude: number | null;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}

export type UpsertBusinessAddressInput = Omit<
  BusinessAddress,
  "id" | "created_at" | "updated_at"
>;

export interface BusinessHour {
  id: string;
  business_id: string;
  day_of_week:
    | "SEGUNDA"
    | "TERCA"
    | "QUARTA"
    | "QUINTA"
    | "SEXTA"
    | "SABADO"
    | "DOMINGO";
  opening_time: string; // TIME
  closing_time: string; // TIME
  is_open: boolean;
  created_at: Date;
  updated_at: Date;
}

export type UpsertBusinessHourInput = Omit<
  BusinessHour,
  "id" | "created_at" | "updated_at"
>;

export interface BusinessPortfolioImage {
  id: string;
  business_id: string;
  image_url: string;
  title: string | null;
  description: string | null;
  display_order: number;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}

export type CreateBusinessPortfolioImageInput = Omit<
  BusinessPortfolioImage,
  "id" | "created_at" | "updated_at"
>;

export type UpdateBusinessPortfolioImageInput = Partial<
  Omit<BusinessPortfolioImage, "id" | "business_id" | "created_at" | "updated_at">
>;

export interface Review {
  id: string;
  business_id: string;
  client_id: string;
  rating: number;
  comment: string | null;
  is_verified: boolean;
  helpful_count: number;
  created_at: Date;
  updated_at: Date;
}

