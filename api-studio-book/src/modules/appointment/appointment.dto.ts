import { Appointment } from "./appointment.entity";

export class CreateAppointmentDTO {
  service_id!: string;
  start_time!: Date;
  end_time!: Date;
}

export class UpdateAppointmentDTO {
  status?: "PENDENTE" | "CONFIRMADO" | "CANCELADO" | "CONCLUIDO";
  start_time?: Date;
  end_time?: Date;
}

export class AppointmentResponseDTO {
  id!: string;
  owner_id!: string;
  client_id!: string;
  business_id!: string;
  service_id!: string;
  start_time!: Date;
  end_time!: Date;
  status!: "PENDENTE" | "CONFIRMADO" | "CANCELADO" | "CONCLUIDO";
  created_at!: Date;
  updated_at!: Date;

  static fromEntity(appointment: Appointment): AppointmentResponseDTO {
    const dto = new AppointmentResponseDTO();
    dto.id = appointment.id;
    dto.owner_id = appointment.owner_id;
    dto.client_id = appointment.client_id;
    dto.business_id = appointment.business_id;
    dto.service_id = appointment.service_id;
    dto.start_time = appointment.start_time;
    dto.end_time = appointment.end_time;
    dto.status = appointment.status;
    dto.created_at = appointment.created_at;
    dto.updated_at = appointment.updated_at;
    return dto;
  }
}
