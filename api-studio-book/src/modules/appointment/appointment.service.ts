import { AppointmentRepository } from "./appointment.repository";
import { CreateAppointmentDTO, UpdateAppointmentDTO, AppointmentResponseDTO } from "./appointment.dto";
import { AppError } from "../../shared/errors/AppError";
import { ServiceRepository } from "../service/service.repository";
import { UserRepository } from "../user/user.repository";

export class AppointmentService {
  static async create(
    data: CreateAppointmentDTO,
    owner_id: string,
    client_id: string,
    business_id: string
  ): Promise<AppointmentResponseDTO> {
    // Validate service exists
    const service = await ServiceRepository.findById(data.service_id);
    if (!service) {
      throw new AppError("Service not found", 404);
    }

    // Validate barber exists and is in the barbershop
    const barber = await UserRepository.findById(owner_id);
    if (!barber) {
      throw new AppError("Barber not found", 404);
    }
    if (barber.business_id !== business_id) {
      throw new AppError("Barber does not work at this barbershop", 400);
    }

    // Validate client exists
    const client = await UserRepository.findById(client_id);
    if (!client) {
      throw new AppError("Client not found", 404);
    }

    // Check for scheduling conflicts
    const conflicts = await AppointmentRepository.findConflicting(
      owner_id,
      data.start_time,
      data.end_time
    );
    if (conflicts.length > 0) {
      throw new AppError("Barber has a conflict with this time slot", 409);
    }

    // Create appointment
    const appointment = await AppointmentRepository.create({
      owner_id,
      client_id,
      business_id,
      service_id: data.service_id,
      start_time: data.start_time,
      end_time: data.end_time,
      status: "PENDENTE",
    });

    return AppointmentResponseDTO.fromEntity(appointment);
  }

  static async findAll(page: number = 1, limit: number = 10) {
    const offset = (page - 1) * limit;
    const { appointments, total } = await AppointmentRepository.findAll(limit, offset);

    return {
      data: appointments.map((a) => AppointmentResponseDTO.fromEntity(a)),
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    };
  }

  static async findById(id: string): Promise<AppointmentResponseDTO | null> {
    const appointment = await AppointmentRepository.findById(id);
    if (!appointment) return null;

    return AppointmentResponseDTO.fromEntity(appointment);
  }

  static async findByBarberId(owner_id: string) {
    const appointments = await AppointmentRepository.findByBarberId(owner_id);
    return appointments.map((a) => AppointmentResponseDTO.fromEntity(a));
  }

  static async findByClientId(client_id: string) {
    const appointments = await AppointmentRepository.findByClientId(client_id);
    return appointments.map((a) => AppointmentResponseDTO.fromEntity(a));
  }

  static async findByBarbershopId(business_id: string) {
    const appointments = await AppointmentRepository.findByBarbershopId(business_id);
    return appointments.map((a) => AppointmentResponseDTO.fromEntity(a));
  }

  static async update(
    id: string,
    data: UpdateAppointmentDTO
  ): Promise<AppointmentResponseDTO | null> {
    const appointment = await AppointmentRepository.findById(id);
    if (!appointment) {
      throw new AppError("Appointment not found", 404);
    }

    // Check for conflicts if updating time
    if (data.start_time || data.end_time) {
      const startTime = data.start_time || appointment.start_time;
      const endTime = data.end_time || appointment.end_time;

      const conflicts = await AppointmentRepository.findConflicting(
        appointment.owner_id,
        startTime,
        endTime,
        id
      );
      if (conflicts.length > 0) {
        throw new AppError("Barber has a conflict with this time slot", 409);
      }
    }

    const updated = await AppointmentRepository.update(id, data);
    if (!updated) return null;

    return AppointmentResponseDTO.fromEntity(updated);
  }

  static async delete(id: string): Promise<void> {
    const appointment = await AppointmentRepository.findById(id);
    if (!appointment) {
      throw new AppError("Appointment not found", 404);
    }

    await AppointmentRepository.delete(id);
  }

  static async cancel(id: string): Promise<AppointmentResponseDTO | null> {
    const appointment = await AppointmentRepository.findById(id);
    if (!appointment) {
      throw new AppError("Appointment not found", 404);
    }

    if (appointment.status === "CANCELADO") {
      throw new AppError("Appointment is already cancelled", 400);
    }

    const updated = await AppointmentRepository.update(id, {
      status: "CANCELADO",
    });
    if (!updated) return null;

    return AppointmentResponseDTO.fromEntity(updated);
  }
}