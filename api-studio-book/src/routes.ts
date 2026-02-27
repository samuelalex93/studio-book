
import { Router } from "express";
import { authorize } from "./shared/middlewares/rbac.middleware";
import userRouter from "./modules/user/user.routes";
import authRouter from "./modules/auth/auth.routes";
import businessRouter from "./modules/business/business.route";
import serviceRouter from "./modules/service/service.routes";
import appointmentRouter from "./modules/appointment/appointment.routes";

const router = Router();

router.get("/", (req, res) => {
  res.json({ message: "StudioBook SaaS API running" });
});

// Auth routes
router.use("/auth", authRouter);

// User routes
router.use("/users", userRouter);

// businesses routes
router.use("/businesses", businessRouter);

// Service routes
router.use("/services", serviceRouter);

// Appointment routes
router.use("/appointments", appointmentRouter);

export default router;
