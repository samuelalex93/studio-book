import path from "path";
import fs from "fs";
import multer from "multer";
import { RequestHandler } from "express";
import { AppError } from "../errors/AppError";

type UploadOptions = {
  /** Field name in multipart form (file) */
  fieldName: string;
  /** Subfolder inside public/uploads */
  subfolder: string;
  /** The body key that will receive the public URL */
  setBodyKey?: string;
};

function ensureDir(dirPath: string) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

function safeExtFromMime(mime: string) {
  if (mime === "image/jpeg") return ".jpg";
  if (mime === "image/png") return ".png";
  if (mime === "image/webp") return ".webp";
  return null;
}

export function uploadPublicImage(options: UploadOptions): RequestHandler {
  const publicRoot = path.resolve(__dirname, "..", "..", "..", "public");
  const uploadsRoot = path.join(publicRoot, "uploads");
  const dest = path.join(uploadsRoot, options.subfolder);
  ensureDir(dest);

  const storage = multer.diskStorage({
    destination: (_req, _file, cb) => cb(null, dest),
    filename: (_req, file, cb) => {
      const ext = safeExtFromMime(file.mimetype);
      if (!ext) {
        return cb(new AppError("Invalid image type", 400), "");
      }
      const name = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
      cb(null, name);
    },
  });

  const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
    fileFilter: (_req, file, cb) => {
      const ext = safeExtFromMime(file.mimetype);
      if (!ext) return cb(new AppError("Invalid image type", 400));
      cb(null, true);
    },
  }).single(options.fieldName);

  const setKey = options.setBodyKey ?? options.fieldName;

  return (req, res, next) => {
    upload(req, res, (err: any) => {
      if (err) return next(err);

      const file = (req as any).file as Express.Multer.File | undefined;
      if (file) {
        const publicUrl = `/public/uploads/${options.subfolder}/${file.filename}`;
        (req as any).body[setKey] = publicUrl;
      }

      next();
    });
  };
}

export function deletePublicImageFromUrl(url: string | null | undefined): void {
  if (!url) return;
  // expected format: /public/...
  const prefix = "/public/";
  if (!url.startsWith(prefix)) return;

  const relativePath = url.slice(prefix.length);
  const publicRoot = path.resolve(__dirname, "..", "..", "..", "public");
  const fullPath = path.join(publicRoot, relativePath.replace(/^uploads[\\/]/, "uploads/"));

  if (fs.existsSync(fullPath)) {
    try {
      fs.unlinkSync(fullPath);
    } catch {
      // swallow error: failing to delete old image shouldn't break the request
    }
  }
}


