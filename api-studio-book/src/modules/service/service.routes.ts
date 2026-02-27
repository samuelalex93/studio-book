import { Router } from "express";
import { ServiceController } from "./service.controller";
import { authMiddleware } from "../../shared/middlewares/auth.midleware";
import { authorize } from "../../shared/middlewares/rbac.middleware";

const serviceRouter = Router();

// Public routes
serviceRouter.get("/", ServiceController.findAll);
serviceRouter.get("/:id", ServiceController.findById);
serviceRouter.get("/business/:business_id", ServiceController.findByBusinessId);

// Protected routes
serviceRouter.post(
  "/barbershop/:business_id",
  authMiddleware,
  authorize(["PROPRIETARIO", "GERENTE"]),
  ServiceController.create
);
serviceRouter.patch(
  "/:id",
  authMiddleware,
  authorize(["PROPRIETARIO", "GERENTE"]),
  ServiceController.update
);
serviceRouter.delete(
  "/:id",
  authMiddleware,
  authorize(["PROPRIETARIO", "GERENTE"]),
  ServiceController.delete
);

export default serviceRouter;
