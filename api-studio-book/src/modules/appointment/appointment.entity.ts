export interface Appointment {
  id: string;
  owner_id: string;
  client_id: string;
  business_id: string;
  service_id: string;
  start_time: Date;
  end_time: Date;
  status: "PENDENTE" | "CONFIRMADO" | "CANCELADO" | "CONCLUIDO";
  created_at: Date;
  updated_at: Date;
}

export type CreateAppointmentInput = Omit<Appointment, "id" | "created_at" | "updated_at">;

export type UpdateAppointmentInput = Partial<
  Omit<Appointment, "id" | "created_at" | "updated_at" | "owner_id" | "client_id" | "business_id">
>;

export type AppointmentResponse = Appointment;
