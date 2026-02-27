import { Router } from "express";
import { AppointmentController } from "./appointment.controller";
import { authMiddleware } from "../../shared/middlewares/auth.midleware";

const appointmentRouter = Router();

// Public routes
appointmentRouter.get("/", AppointmentController.findAll);
appointmentRouter.get("/:id", AppointmentController.findById);
appointmentRouter.get("/barber/:owner_id", AppointmentController.findByBarberId);
appointmentRouter.get("/client/:client_id", AppointmentController.findByClientId);
appointmentRouter.get("/barbershop/:business_id", AppointmentController.findByBarbershopId);

// Protected routes
appointmentRouter.post(
  "/barber/:owner_id/barbershop/:business_id",
  authMiddleware,
  AppointmentController.create
);
appointmentRouter.patch(
  "/:id",
  authMiddleware,
  AppointmentController.update
);
appointmentRouter.delete(
  "/:id",
  authMiddleware,
  AppointmentController.delete
);
appointmentRouter.patch(
  "/:id/cancel",
  authMiddleware,
  AppointmentController.cancel
);

export default appointmentRouter;
