import { BusinessRepository } from "./business.repository";
import { CreateBusinessDTO, UpdateBusinessDTO, BusinessResponseDTO } from "./business.dto";
import { AppError } from "../../shared/errors/AppError";
import {
  CreateBusinessPortfolioImageInput,
  UpsertBusinessAddressInput,
  UpsertBusinessHourInput,
  UpdateBusinessPortfolioImageInput,
} from "./business.related.entity";
import { deletePublicImageFromUrl } from "../../shared/upload/uploadImage";

export class BusinessService {
  static async create(
    data: CreateBusinessDTO,
    owner_id: string
  ): Promise<BusinessResponseDTO> {
    if (!data.name || !data.address || !data.business_type_id) {
      throw new AppError("Missing required fields", 400);
    }

    const existing = await BusinessRepository.findByNameAndAddress(data.name, data.address);
    if (existing) {
      throw new AppError("Business already exists at this address", 409);
    }

    const business = await BusinessRepository.create({
      name: data.name,
      description: data.description ?? null,
      address: data.address,
      phone: data.phone ?? null,
      cnpj: data.cnpj ?? null,
      municipal_registration: data.municipal_registration ?? null,
      business_type_id: data.business_type_id,
      cover_image: data.cover_image ?? null,
      is_active: data.is_active ?? true,
      owner_id,
    });

    return BusinessResponseDTO.fromEntity(business);
  }

  static async findAll(page: number = 1, limit: number = 10) {
    const offset = (page - 1) * limit;
    const { businesses, total } = await BusinessRepository.findAll(limit, offset);

    return {
      data: businesses.map((b) => BusinessResponseDTO.fromEntity(b)),
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    };
  }

  static async findById(id: string): Promise<BusinessResponseDTO | null> {
    const business = await BusinessRepository.findById(id);
    if (!business) return null;

    return BusinessResponseDTO.fromEntity(business);
  }

  static async update(
    id: string,
    data: UpdateBusinessDTO,
    owner_id: string
  ): Promise<BusinessResponseDTO | null> {
    const business = await BusinessRepository.findById(id);
    if (!business) {
      throw new AppError("Business not found", 404);
    }

    if (business.owner_id !== owner_id) {
      throw new AppError("Only the owner can update this business", 403);
    }

    const updated = await BusinessRepository.update(id, data);
    if (!updated) return null;

    // if cover_image changed, delete old file
    if (data.cover_image && business.cover_image && data.cover_image !== business.cover_image) {
      deletePublicImageFromUrl(business.cover_image);
    }

    return BusinessResponseDTO.fromEntity(updated);
  }

  static async delete(id: string, owner_id: string): Promise<void> {
    const business = await BusinessRepository.findById(id);
    if (!business) {
      throw new AppError("Business not found", 404);
    }

    if (business.owner_id !== owner_id) {
      throw new AppError("Only the owner can delete this business", 403);
    }

    await BusinessRepository.delete(id);
  }

  static async findByOwnerId(owner_id: string) {
    const businesses = await BusinessRepository.findByOwnerId(owner_id);
    return businesses.map((b) => BusinessResponseDTO.fromEntity(b));
  }

  static async listBusinessTypes() {
    return BusinessRepository.listBusinessTypes(true);
  }

  static async getDetails(business_id: string) {
    const business = await BusinessRepository.findWithOwnerDetails(business_id);
    if (!business) {
      throw new AppError("Business not found", 404);
    }

    const [address, hours, portfolio, reviews] = await Promise.all([
      BusinessRepository.findAddressByBusinessId(business_id),
      BusinessRepository.listHoursByBusinessId(business_id),
      BusinessRepository.listPortfolioImages(business_id),
      BusinessRepository.listReviewsByBusinessId(business_id),
    ]);

    return { business, address, hours, portfolio, reviews };
  }

  static async getAddress(business_id: string) {
    return BusinessRepository.findAddressByBusinessId(business_id);
  }

  static async upsertAddress(business_id: string, data: Omit<UpsertBusinessAddressInput, "business_id">) {
    const business = await BusinessRepository.findById(business_id);
    if (!business) throw new AppError("Business not found", 404);

    return BusinessRepository.upsertAddress({ ...data, business_id });
  }

  static async listHours(business_id: string) {
    const business = await BusinessRepository.findById(business_id);
    if (!business) throw new AppError("Business not found", 404);

    return BusinessRepository.listHoursByBusinessId(business_id);
  }

  static async upsertHour(
    business_id: string,
    data: Omit<UpsertBusinessHourInput, "business_id">
  ) {
    const business = await BusinessRepository.findById(business_id);
    if (!business) throw new AppError("Business not found", 404);

    return BusinessRepository.upsertHour({ ...data, business_id });
  }

  static async listPortfolio(business_id: string) {
    const business = await BusinessRepository.findById(business_id);
    if (!business) throw new AppError("Business not found", 404);

    return BusinessRepository.listPortfolioImages(business_id);
  }

  static async addPortfolioImage(
    business_id: string,
    data: Omit<CreateBusinessPortfolioImageInput, "business_id">
  ) {
    const business = await BusinessRepository.findById(business_id);
    if (!business) throw new AppError("Business not found", 404);

    return BusinessRepository.createPortfolioImage({ ...data, business_id });
  }

  static async updatePortfolioImage(
    business_id: string,
    image_id: string,
    data: UpdateBusinessPortfolioImageInput
  ) {
    const business = await BusinessRepository.findById(business_id);
    if (!business) throw new AppError("Business not found", 404);
    const currentList = await BusinessRepository.listPortfolioImages(business_id);
    const current = currentList.find((img) => img.id === image_id) || null;

    const updated = await BusinessRepository.updatePortfolioImage(image_id, business_id, data);

    if (updated && data.image_url && current?.image_url && data.image_url !== current.image_url) {
      deletePublicImageFromUrl(current.image_url);
    }

    return updated;
  }

  static async deletePortfolioImage(business_id: string, image_id: string) {
    const business = await BusinessRepository.findById(business_id);
    if (!business) throw new AppError("Business not found", 404);

    const deleted = await BusinessRepository.deletePortfolioImage(image_id, business_id);
    if (!deleted) throw new AppError("Portfolio image not found", 404);
  }

  static async listReviews(business_id: string) {
    const business = await BusinessRepository.findById(business_id);
    if (!business) throw new AppError("Business not found", 404);

    return BusinessRepository.listReviewsByBusinessId(business_id);
  }
}