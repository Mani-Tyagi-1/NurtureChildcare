// src/middleware/auth.ts
import { Request, Response, NextFunction } from "express";
import jwt, { TokenExpiredError } from "jsonwebtoken";
import Admin from "../models/AdminModel";

// ---- Types ----
type JWTPayload = { id: string; tokenVersion?: number; iat?: number };

// Augment Express.Request once (so req.admin is typed everywhere)
declare module "express-serve-static-core" {
  interface Request {
    admin?: typeof Admin.prototype;
    jwt?: JWTPayload;
  }
}

// ---- Helpers ----
const getBearerToken = (req: Request) => {
  const h = req.headers.authorization;
  if (!h) return null;
  const match = /^Bearer\s+(.+)$/i.exec(h);
  return match ? match[1] : null;
};

const verifyToken = (token: string) =>
  jwt.verify(token, process.env.JWT_SECRET as string) as JWTPayload;

// ---- Middlewares ----
export const requireAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = getBearerToken(req);
  if (!token) return res.status(401).json({ message: "No token provided" });

  try {
    const decoded = verifyToken(token);
    const admin = await Admin.findById(decoded.id);
    if (!admin)
      return res
        .status(401)
        .json({ message: "Invalid token or user not found" });

    // OPTIONAL revocation checks (see notes below):
    // if (decoded.tokenVersion !== admin.tokenVersion) {
    //   return res.status(401).json({ message: 'Token revoked' });
    // }
    // if (admin.passwordChangedAt && decoded.iat && admin.passwordChangedAt.getTime() / 1000 > decoded.iat) {
    //   return res.status(401).json({ message: 'Token issued before password change' });
    // }

    req.admin = admin;
    req.jwt = decoded;
    next();
  } catch (err) {
    if (err instanceof TokenExpiredError) {
      return res.status(401).json({ message: "Token expired" });
    }
    return res.status(401).json({ message: "Invalid token" });
  }
};

// Reuse requireAuth, then check role
export const requireSuperAdmin = [
  requireAuth,
  (req: Request, res: Response, next: NextFunction) => {
    if (!req.admin?.superadmin) {
      return res
        .status(403)
        .json({ message: "Access denied: Not a superadmin" });
    }
    next();
  },
];
