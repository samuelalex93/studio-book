import { Router } from "express";
import { BusinessController } from "./business.controller";
import { authMiddleware } from "../../shared/middlewares/auth.midleware";
import { authorize } from "../../shared/middlewares/rbac.middleware";
import { uploadPublicImage } from "../../shared/upload/uploadImage";

const businessRouter = Router();

// Public routes
businessRouter.get("/", BusinessController.findAll);
businessRouter.get("/types", BusinessController.listTypes);
businessRouter.get("/:id/details", BusinessController.getDetails);
businessRouter.get("/:id", BusinessController.findOne);
businessRouter.get("/owner/:owner_id", BusinessController.findByOwnerId);
businessRouter.get("/:business_id/address", BusinessController.getAddress);
businessRouter.get("/:business_id/hours", BusinessController.listHours);
businessRouter.get("/:business_id/portfolio", BusinessController.listPortfolio);
businessRouter.get("/:business_id/reviews", BusinessController.listReviews);

// Protected routes
businessRouter.post(
  "/",
  authMiddleware,
  authorize(["PROPRIETARIO", "GERENTE"]),
  uploadPublicImage({ fieldName: "cover_image", subfolder: "businesses", setBodyKey: "cover_image" }),
  BusinessController.create
);
businessRouter.patch(
  "/:id",
  authMiddleware,
  authorize(["PROPRIETARIO", "GERENTE"]),
  uploadPublicImage({ fieldName: "cover_image", subfolder: "businesses", setBodyKey: "cover_image" }),
  BusinessController.update
);
businessRouter.delete(
  "/:id",
  authMiddleware,
  authorize(["PROPRIETARIO", "GERENTE"]),
  BusinessController.delete
);

businessRouter.put(
  "/:business_id/address",
  authMiddleware,
  authorize(["PROPRIETARIO", "GERENTE"]),
  BusinessController.upsertAddress
);

businessRouter.put(
  "/:business_id/hours/:day_of_week",
  authMiddleware,
  authorize(["PROPRIETARIO", "GERENTE"]),
  BusinessController.upsertHour
);

businessRouter.post(
  "/:business_id/portfolio",
  authMiddleware,
  authorize(["PROPRIETARIO", "GERENTE"]),
  uploadPublicImage({ fieldName: "image", subfolder: "portfolio", setBodyKey: "image_url" }),
  BusinessController.addPortfolioImage
);

businessRouter.patch(
  "/:business_id/portfolio/:image_id",
  authMiddleware,
  authorize(["PROPRIETARIO", "GERENTE"]),
  uploadPublicImage({ fieldName: "image", subfolder: "portfolio", setBodyKey: "image_url" }),
  BusinessController.updatePortfolioImage
);
businessRouter.delete(
  "/:business_id/portfolio/:image_id",
  authMiddleware,
  authorize(["PROPRIETARIO", "GERENTE"]),
  BusinessController.deletePortfolioImage
);

export default businessRouter;