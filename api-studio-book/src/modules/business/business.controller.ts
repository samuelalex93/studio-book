import { Request, Response } from "express";
import { BusinessService } from "./business.service";
import { AppError } from "../../shared/errors/AppError";

export class BusinessController {
  static async listTypes(req: Request, res: Response) {
    try {
      const types = await BusinessService.listBusinessTypes();
      return res.json(types);
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  static async create(req: Request, res: Response) {
    try {
      const owner_id = (req as any).user?.id;
      if (!owner_id) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const business = await BusinessService.create(req.body, owner_id);
      return res.status(201).json(business);
    } catch (error) {
      if (error instanceof AppError) {
        return res.status(error.statusCode).json({ message: error.message });
      }
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  static async findAll(req: Request, res: Response) {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;

      const result = await BusinessService.findAll(page, limit);
      return res.json(result);
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  static async findOne(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const business = await BusinessService.findById(id as string);

      if (!business) {
        return res.status(404).json({ message: "Business not found" });
      }

      return res.json(business);
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const owner_id = (req as any).user?.id;

      if (!owner_id) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const business = await BusinessService.update(id as string, req.body, owner_id);

      if (!business) {
        return res.status(404).json({ message: "Business not found" });
      }

      return res.json(business);
    } catch (error) {
      if (error instanceof AppError) {
        return res.status(error.statusCode).json({ message: error.message });
      }
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const owner_id = (req as any).user?.id;

      if (!owner_id) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      await BusinessService.delete(id as string, owner_id);
      return res.status(204).send();
    } catch (error) {
      if (error instanceof AppError) {
        return res.status(error.statusCode).json({ message: error.message });
      }
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  static async findByOwnerId(req: Request, res: Response) {
    try {
      const { owner_id } = req.params;
      const businesses = await BusinessService.findByOwnerId(owner_id as string);
      return res.json(businesses);
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  static async getDetails(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const details = await BusinessService.getDetails(id as string);
      return res.json(details);
    } catch (error) {
      if (error instanceof AppError) {
        return res.status(error.statusCode).json({ message: error.message });
      }
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  static async getAddress(req: Request, res: Response) {
    try {
      const { business_id } = req.params;
      const address = await BusinessService.getAddress(business_id as string);
      if (!address) {
        return res.status(404).json({ message: "Business address not found" });
      }
      return res.json(address);
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  static async upsertAddress(req: Request, res: Response) {
    try {
      const { business_id } = req.params;
      const address = await BusinessService.upsertAddress(business_id as string, req.body);
      return res.json(address);
    } catch (error) {
      if (error instanceof AppError) {
        return res.status(error.statusCode).json({ message: error.message });
      }
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  static async listHours(req: Request, res: Response) {
    try {
      const { business_id } = req.params;
      const hours = await BusinessService.listHours(business_id as string);
      return res.json(hours);
    } catch (error) {
      if (error instanceof AppError) {
        return res.status(error.statusCode).json({ message: error.message });
      }
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  static async upsertHour(req: Request, res: Response) {
    try {
      const { business_id, day_of_week } = req.params;
      const hour = await BusinessService.upsertHour(business_id as string, {
        ...req.body,
        day_of_week,
      });
      return res.json(hour);
    } catch (error) {
      if (error instanceof AppError) {
        return res.status(error.statusCode).json({ message: error.message });
      }
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  static async listPortfolio(req: Request, res: Response) {
    try {
      const { business_id } = req.params;
      const images = await BusinessService.listPortfolio(business_id as string);
      return res.json(images);
    } catch (error) {
      if (error instanceof AppError) {
        return res.status(error.statusCode).json({ message: error.message });
      }
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  static async addPortfolioImage(req: Request, res: Response) {
    try {
      const { business_id } = req.params;
      const image = await BusinessService.addPortfolioImage(business_id as string, req.body);
      return res.status(201).json(image);
    } catch (error) {
      if (error instanceof AppError) {
        return res.status(error.statusCode).json({ message: error.message });
      }
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  static async updatePortfolioImage(req: Request, res: Response) {
    try {
      const { business_id, image_id } = req.params;
      const image = await BusinessService.updatePortfolioImage(
        business_id as string,
        image_id as string,
        req.body
      );
      if (!image) {
        return res.status(404).json({ message: "Portfolio image not found" });
      }
      return res.json(image);
    } catch (error) {
      if (error instanceof AppError) {
        return res.status(error.statusCode).json({ message: error.message });
      }
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  static async deletePortfolioImage(req: Request, res: Response) {
    try {
      const { business_id, image_id } = req.params;
      await BusinessService.deletePortfolioImage(business_id as string, image_id as string);
      return res.status(204).send();
    } catch (error) {
      if (error instanceof AppError) {
        return res.status(error.statusCode).json({ message: error.message });
      }
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  static async listReviews(req: Request, res: Response) {
    try {
      const { business_id } = req.params;
      const reviews = await BusinessService.listReviews(business_id as string);
      return res.json(reviews);
    } catch (error) {
      if (error instanceof AppError) {
        return res.status(error.statusCode).json({ message: error.message });
      }
      return res.status(500).json({ message: "Internal server error" });
    }
  }
}