import { Router } from "express";
import { UserController } from "./user.controller";
import { authMiddleware } from "../../shared/middlewares/auth.midleware";
import { uploadPublicImage } from "../../shared/upload/uploadImage";

const userRouter = Router();

// Public routes
userRouter.get("/", UserController.findAll);
userRouter.get("/:id", UserController.findById);
userRouter.get("/role/:role", UserController.findByRole);
userRouter.get("/business/:businessId", UserController.findByBusinessId);

// Protected routes
userRouter.post(
  "/",
  authMiddleware,
  uploadPublicImage({ fieldName: "avatar_image", subfolder: "avatars", setBodyKey: "avatar_image" }),
  UserController.create
);
userRouter.post("/employee", authMiddleware, UserController.createBarber);
userRouter.patch(
  "/:id",
  authMiddleware,
  uploadPublicImage({ fieldName: "avatar_image", subfolder: "avatars", setBodyKey: "avatar_image" }),
  UserController.update
);
userRouter.delete("/:id", authMiddleware, UserController.delete);

export default userRouter;