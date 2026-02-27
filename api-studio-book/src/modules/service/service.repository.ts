import { pool } from "../../config/database";
import { CreateServiceInput, UpdateServiceInput, Service } from "./service.entity";

export class ServiceRepository {
  static async create(data: CreateServiceInput): Promise<Service> {
    const { name, description, price, duration_minutes, business_id, category_id, is_active } = data;

    const query = `
      INSERT INTO services (
        id,
        name,
        description,
        price,
        duration_minutes,
        business_id,
        category_id,
        is_active
      )
      VALUES (gen_random_uuid(), $1, $2, $3, $4, $5, $6, $7)
      RETURNING *
    `;

    const result = await pool.query(query, [
      name,
      description || null,
      price,
      duration_minutes,
      business_id,
      category_id ?? null,
      is_active ?? true,
    ]);

    return result.rows[0];
  }

  static async findById(id: string): Promise<Service | null> {
    const query = "SELECT * FROM services WHERE id = $1";
    const result = await pool.query(query, [id]);

    return result.rows[0] || null;
  }

  static async findAll(
    limit: number = 10,
    offset: number = 0
  ): Promise<{ services: Service[]; total: number }> {
    const servicesQuery = `
      SELECT * FROM services 
      ORDER BY created_at DESC 
      LIMIT $1 OFFSET $2
    `;
    const countQuery = "SELECT COUNT(*) FROM services";

    const [servicesResult, countResult] = await Promise.all([
      pool.query(servicesQuery, [limit, offset]),
      pool.query(countQuery),
    ]);

    return {
      services: servicesResult.rows,
      total: parseInt(countResult.rows[0].count),
    };
  }

  static async findByBusinessId(business_id: string): Promise<Service[]> {
    const query = `
      SELECT * FROM services 
      WHERE business_id = $1 
      ORDER BY created_at DESC
    `;
    const result = await pool.query(query, [business_id]);

    return result.rows;
  }

  static async update(id: string, data: UpdateServiceInput): Promise<Service | null> {
    const fields: string[] = [];
    const values: any[] = [];
    let paramCount = 1;

    if (data.name !== undefined) {
      fields.push(`name = $${paramCount++}`);
      values.push(data.name);
    }
    if (data.description !== undefined) {
      fields.push(`description = $${paramCount++}`);
      values.push(data.description);
    }
    if (data.price !== undefined) {
      fields.push(`price = $${paramCount++}`);
      values.push(data.price);
    }
    if (data.duration_minutes !== undefined) {
      fields.push(`duration_minutes = $${paramCount++}`);
      values.push(data.duration_minutes);
    }
    if (data.category_id !== undefined) {
      fields.push(`category_id = $${paramCount++}`);
      values.push(data.category_id);
    }
    if (data.is_active !== undefined) {
      fields.push(`is_active = $${paramCount++}`);
      values.push(data.is_active);
    }

    if (fields.length === 0) {
      return this.findById(id);
    }

    fields.push(`updated_at = NOW()`);
    values.push(id);

    const query = `
      UPDATE services
      SET ${fields.join(", ")}
      WHERE id = $${paramCount}
      RETURNING *
    `;

    const result = await pool.query(query, values);

    return result.rows[0] || null;
  }

  static async delete(id: string): Promise<boolean> {
    const query = "DELETE FROM services WHERE id = $1";
    const result = await pool.query(query, [id]);

    return result.rowCount ? result.rowCount > 0 : false;
  }

  static async exists(id: string): Promise<boolean> {
    const query = "SELECT EXISTS(SELECT 1 FROM services WHERE id = $1) as exists";
    const result = await pool.query(query, [id]);

    return result.rows[0].exists;
  }
}
