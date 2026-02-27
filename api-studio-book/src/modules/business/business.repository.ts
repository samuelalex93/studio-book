import { pool } from "../../config/database";
import { CreateBusinessInput, UpdateBusinessInput, Business } from "./business.entity";
import {
  BusinessAddress,
  BusinessHour,
  BusinessPortfolioImage,
  BusinessType,
  CreateBusinessPortfolioImageInput,
  Review,
  UpsertBusinessAddressInput,
  UpsertBusinessHourInput,
  UpdateBusinessPortfolioImageInput,
} from "./business.related.entity";

export class BusinessRepository {
  static async create(data: CreateBusinessInput): Promise<Business> {
    const {
      name,
      description,
      address,
      phone,
      cnpj,
      municipal_registration,
      owner_id,
      business_type_id,
      cover_image,
      is_active,
    } = data;

    const query = `
      INSERT INTO businesses (
        id,
        name,
        description,
        address,
        phone,
        cnpj,
        municipal_registration,
        owner_id,
        business_type_id,
        cover_image,
        is_active
      )
      VALUES (
        gen_random_uuid(),
        $1, $2, $3, $4, $5, $6, $7, $8, $9, $10
      )
      RETURNING *
    `;

    const result = await pool.query(query, [
      name,
      description || null,
      address,
      phone || null,
      cnpj || null,
      municipal_registration || null,
      owner_id,
      business_type_id,
      cover_image || null,
      is_active ?? true,
    ]);

    return result.rows[0];
  }

  static async findById(id: string): Promise<Business | null> {
    const query = "SELECT * FROM businesses WHERE id = $1";
    const result = await pool.query(query, [id]);

    return result.rows[0] || null;
  }

  static async findAll(
    limit: number = 10,
    offset: number = 0
  ): Promise<{ businesses: Business[]; total: number }> {
    const businessesQuery = `
      SELECT * FROM businesses 
      ORDER BY created_at DESC 
      LIMIT $1 OFFSET $2
    `;
    const countQuery = "SELECT COUNT(*) FROM businesses";

    const [businessesResult, countResult] = await Promise.all([
      pool.query(businessesQuery, [limit, offset]),
      pool.query(countQuery),
    ]);

    return {
      businesses: businessesResult.rows,
      total: parseInt(countResult.rows[0].count),
    };
  }

  static async findByOwnerId(owner_id: string): Promise<Business[]> {
    const query = "SELECT * FROM businesses WHERE owner_id = $1 ORDER BY created_at DESC";
    const result = await pool.query(query, [owner_id]);

    return result.rows;
  }

  static async update(
    id: string,
    data: UpdateBusinessInput
  ): Promise<Business | null> {
    const fields: string[] = [];
    const values: any[] = [];

    if (data.name !== undefined) {
      fields.push(`name = $${values.length + 1}`);
      values.push(data.name);
    }

    if (data.description !== undefined) {
      fields.push(`description = $${values.length + 1}`);
      values.push(data.description);
    }

    if (data.address !== undefined) {
      fields.push(`address = $${values.length + 1}`);
      values.push(data.address);
    }

    if (data.phone !== undefined) {
      fields.push(`phone = $${values.length + 1}`);
      values.push(data.phone);
    }

    if (data.cnpj !== undefined) {
      fields.push(`cnpj = $${values.length + 1}`);
      values.push(data.cnpj);
    }

    if (data.municipal_registration !== undefined) {
      fields.push(`municipal_registration = $${values.length + 1}`);
      values.push(data.municipal_registration);
    }

    if (data.business_type_id !== undefined) {
      fields.push(`business_type_id = $${values.length + 1}`);
      values.push(data.business_type_id);
    }

    if (data.cover_image !== undefined) {
      fields.push(`cover_image = $${values.length + 1}`);
      values.push(data.cover_image);
    }

    if (data.is_active !== undefined) {
      fields.push(`is_active = $${values.length + 1}`);
      values.push(data.is_active);
    }

    if (fields.length === 0) {
      return this.findById(id);
    }

    fields.push(`updated_at = NOW()`);

    values.push(id);

    const query = `
      UPDATE businesses
      SET ${fields.join(", ")}
      WHERE id = $${values.length}
      RETURNING *
    `;

    const result = await pool.query(query, values);

    return result.rows[0] || null;
  }

  static async delete(id: string): Promise<boolean> {
    const query = "DELETE FROM businesses WHERE id = $1";
    const result = await pool.query(query, [id]);

    return result.rowCount ? result.rowCount > 0 : false;
  }

  static async exists(id: string): Promise<boolean> {
    const query = "SELECT EXISTS(SELECT 1 FROM businesses WHERE id = $1) as exists";
    const result = await pool.query(query, [id]);

    return result.rows[0].exists;
  }

  static async findByNameAndAddress(name: string, address: string): Promise<Business | null> {
    const query = "SELECT * FROM businesses WHERE name = $1 AND address = $2";
    const result = await pool.query(query, [name, address]);

    return result.rows[0] || null;
  }

  static async findWithOwnerDetails(
    id: string
  ): Promise<(Business & { owner?: any }) | null> {
    const query = `
      SELECT 
        b.*,
        json_build_object(
          'id', u.id,
          'name', u.name,
          'email', u.email
        ) as owner
      FROM businesses b
      LEFT JOIN users u ON b.owner_id = u.id
      WHERE b.id = $1
    `;

    const result = await pool.query(query, [id]);

    return result.rows[0] || null;
  }

  static async listBusinessTypes(onlyActive: boolean = true): Promise<BusinessType[]> {
    const query = onlyActive
      ? "SELECT * FROM business_types WHERE is_active = true ORDER BY name ASC"
      : "SELECT * FROM business_types ORDER BY name ASC";
    const result = await pool.query(query);
    return result.rows;
  }

  static async findAddressByBusinessId(business_id: string): Promise<BusinessAddress | null> {
    const query = `
      SELECT *
      FROM business_addresses
      WHERE business_id = $1
      LIMIT 1
    `;
    const result = await pool.query(query, [business_id]);
    return result.rows[0] || null;
  }

  static async upsertAddress(data: UpsertBusinessAddressInput): Promise<BusinessAddress> {
    const {
      business_id,
      street,
      number,
      complement,
      city,
      state,
      postal_code,
      latitude,
      longitude,
      is_active,
    } = data;

    const query = `
      INSERT INTO business_addresses (
        id,
        business_id,
        street,
        number,
        complement,
        city,
        state,
        postal_code,
        latitude,
        longitude,
        is_active
      )
      VALUES (
        gen_random_uuid(),
        $1, $2, $3, $4, $5, $6, $7, $8, $9, $10
      )
      ON CONFLICT (business_id)
      DO UPDATE SET
        street = EXCLUDED.street,
        number = EXCLUDED.number,
        complement = EXCLUDED.complement,
        city = EXCLUDED.city,
        state = EXCLUDED.state,
        postal_code = EXCLUDED.postal_code,
        latitude = EXCLUDED.latitude,
        longitude = EXCLUDED.longitude,
        is_active = EXCLUDED.is_active
      RETURNING *
    `;

    const result = await pool.query(query, [
      business_id,
      street,
      number,
      complement ?? null,
      city,
      state,
      postal_code ?? null,
      latitude ?? null,
      longitude ?? null,
      is_active ?? true,
    ]);

    return result.rows[0];
  }

  static async listHoursByBusinessId(business_id: string): Promise<BusinessHour[]> {
    const query = `
      SELECT *
      FROM business_hours
      WHERE business_id = $1
      ORDER BY created_at ASC
    `;
    const result = await pool.query(query, [business_id]);
    return result.rows;
  }

  static async upsertHour(data: UpsertBusinessHourInput): Promise<BusinessHour> {
    const { business_id, day_of_week, opening_time, closing_time, is_open } = data;

    const query = `
      INSERT INTO business_hours (
        id,
        business_id,
        day_of_week,
        opening_time,
        closing_time,
        is_open
      )
      VALUES (
        gen_random_uuid(),
        $1, $2, $3, $4, $5
      )
      ON CONFLICT (business_id, day_of_week)
      DO UPDATE SET
        opening_time = EXCLUDED.opening_time,
        closing_time = EXCLUDED.closing_time,
        is_open = EXCLUDED.is_open
      RETURNING *
    `;

    const result = await pool.query(query, [
      business_id,
      day_of_week,
      opening_time,
      closing_time,
      is_open ?? true,
    ]);

    return result.rows[0];
  }

  static async listPortfolioImages(business_id: string): Promise<BusinessPortfolioImage[]> {
    const query = `
      SELECT *
      FROM business_portfolio_images
      WHERE business_id = $1
      ORDER BY display_order ASC, created_at DESC
    `;
    const result = await pool.query(query, [business_id]);
    return result.rows;
  }

  static async createPortfolioImage(
    data: CreateBusinessPortfolioImageInput
  ): Promise<BusinessPortfolioImage> {
    const {
      business_id,
      image_url,
      title,
      description,
      display_order,
      is_active,
    } = data;

    const query = `
      INSERT INTO business_portfolio_images (
        id,
        business_id,
        image_url,
        title,
        description,
        display_order,
        is_active
      )
      VALUES (
        gen_random_uuid(),
        $1, $2, $3, $4, $5, $6
      )
      RETURNING *
    `;

    const result = await pool.query(query, [
      business_id,
      image_url,
      title ?? null,
      description ?? null,
      display_order ?? 0,
      is_active ?? true,
    ]);

    return result.rows[0];
  }

  static async updatePortfolioImage(
    id: string,
    business_id: string,
    data: UpdateBusinessPortfolioImageInput
  ): Promise<BusinessPortfolioImage | null> {
    const fields: string[] = [];
    const values: any[] = [];
    let paramCount = 1;

    if (data.image_url !== undefined) {
      fields.push(`image_url = $${paramCount++}`);
      values.push(data.image_url);
    }
    if (data.title !== undefined) {
      fields.push(`title = $${paramCount++}`);
      values.push(data.title);
    }
    if (data.description !== undefined) {
      fields.push(`description = $${paramCount++}`);
      values.push(data.description);
    }
    if (data.display_order !== undefined) {
      fields.push(`display_order = $${paramCount++}`);
      values.push(data.display_order);
    }
    if (data.is_active !== undefined) {
      fields.push(`is_active = $${paramCount++}`);
      values.push(data.is_active);
    }

    if (fields.length === 0) {
      const current = await pool.query(
        "SELECT * FROM business_portfolio_images WHERE id = $1 AND business_id = $2",
        [id, business_id]
      );
      return current.rows[0] || null;
    }

    values.push(id, business_id);

    const query = `
      UPDATE business_portfolio_images
      SET ${fields.join(", ")}
      WHERE id = $${paramCount} AND business_id = $${paramCount + 1}
      RETURNING *
    `;

    const result = await pool.query(query, values);
    return result.rows[0] || null;
  }

  static async deletePortfolioImage(id: string, business_id: string): Promise<boolean> {
    const query = "DELETE FROM business_portfolio_images WHERE id = $1 AND business_id = $2";
    const result = await pool.query(query, [id, business_id]);
    return result.rowCount ? result.rowCount > 0 : false;
  }

  static async listReviewsByBusinessId(business_id: string): Promise<Review[]> {
    const query = `
      SELECT *
      FROM reviews
      WHERE business_id = $1
      ORDER BY created_at DESC
    `;
    const result = await pool.query(query, [business_id]);
    return result.rows;
  }
}
