import { Router } from "express";
import { AppointmentController } from "./appointment.controller";
import { authMiddleware } from "../../shared/middlewares/auth.midleware";

const appointmentRouter = Router();

// Public routes
appointmentRouter.get("/", AppointmentController.findAll);
appointmentRouter.get("/:id", AppointmentController.findById);
appointmentRouter.get("/owner/:owner_id", AppointmentController.findByOwnerId);
appointmentRouter.get("/client/:client_id", AppointmentController.findByClientId);
appointmentRouter.get("/business/:business_id", AppointmentController.findByBusinessId);

// Protected routes
appointmentRouter.post(
  "/owner/:owner_id/business/:business_id",
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
