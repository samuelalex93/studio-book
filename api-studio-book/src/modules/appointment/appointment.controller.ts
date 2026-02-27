import { Request, Response } from "express";
import { AppointmentService } from "./appointment.service";
import { AppError } from "../../shared/errors/AppError";

export class AppointmentController {
  static async create(req: Request, res: Response) {
    try {
      const client_id = (req as any).user?.id;
      const { owner_id, business_id } = req.params;

      if (!client_id || !owner_id || !business_id) {
        return res.status(400).json({ message: "Missing required parameters" });
      }

      const appointment = await AppointmentService.create(
        req.body,
        owner_id as string,
        client_id,
        business_id as string
      );
      return res.status(201).json(appointment);
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

      const result = await AppointmentService.findAll(page, limit);
      return res.json(result);
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  static async findById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const appointment = await AppointmentService.findById(id as string);

      if (!appointment) {
        return res.status(404).json({ message: "Appointment not found" });
      }

      return res.json(appointment);
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  static async findByBarberId(req: Request, res: Response) {
    try {
      const { owner_id } = req.params;
      const appointments = await AppointmentService.findByBarberId(owner_id as string);
      return res.json(appointments);
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  static async findByClientId(req: Request, res: Response) {
    try {
      const { client_id } = req.params;
      const appointments = await AppointmentService.findByClientId(client_id as string);
      return res.json(appointments);
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  static async findByBarbershopId(req: Request, res: Response) {
    try {
      const { business_id } = req.params;
      const appointments = await AppointmentService.findByBarbershopId(business_id as string);
      return res.json(appointments);
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const appointment = await AppointmentService.update(id as string, req.body);

      if (!appointment) {
        return res.status(404).json({ message: "Appointment not found" });
      }

      return res.json(appointment);
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
      await AppointmentService.delete(id as string);
      return res.status(204).send();
    } catch (error) {
      if (error instanceof AppError) {
        return res.status(error.statusCode).json({ message: error.message });
      }
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  static async cancel(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const appointment = await AppointmentService.cancel(id as string);

      if (!appointment) {
        return res.status(404).json({ message: "Appointment not found" });
      }

      return res.json(appointment);
    } catch (error) {
      if (error instanceof AppError) {
        return res.status(error.statusCode).json({ message: error.message });
      }
      return res.status(500).json({ message: "Internal server error" });
    }
  }
}
