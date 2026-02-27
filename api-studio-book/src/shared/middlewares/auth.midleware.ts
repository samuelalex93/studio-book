import { NextFunction, Response, Request } from "express";
import { validateJwt } from "../hash/jwt";

export interface AuthRequest extends Request {
  userId?: string;
  userRole?: string;
  user?: {
    id: string;
    role: string;
    email?: string;
  };
}

export const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization as any;

  if (!authHeader)
    return res.status(401).json({ message: "Token missing" });

  const token = authHeader.split(" ")[1];

  try {
    const payload = validateJwt(token);
    req.userId = payload.sub;
    req.userRole = payload.role;
    req.user = { id: payload.sub, role: payload.role, email: payload.email };
    next();
  } catch {
    return res.status(401).json({ message: "Invalid token" });
  }
};