import multer, { FileFilterCallback } from "multer";
import path from "path";
import dotenv from "dotenv";
import fs from "fs";
import { Request } from "express";

dotenv.config();

const uploadDirectory = process.env.DATA_PATH || "";
const allowedExtensions = process.env.ALLOWED_FILE_EXTENSIONS?.split(",") || [];
const maxFileSize = process.env.MAX_FILE_SIZE
  ? parseInt(process.env.MAX_FILE_SIZE)
  : 0;

const storage = multer.diskStorage({
  destination: (req: Request, file: Express.Multer.File, setDestination) => {
    if (!fs.existsSync(uploadDirectory)) {
      fs.mkdirSync(uploadDirectory, { recursive: true });
    }

    setDestination(null, uploadDirectory);
  },
  filename: (req, file, setFileName) => {
    setFileName(null, file.originalname);
  },
});

const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  validateFile: FileFilterCallback
) => {
  const fileExtension = path.extname(file.originalname).toLowerCase();
  if (allowedExtensions.includes(fileExtension)) {
    validateFile(null, true);
  } else {
    validateFile(null, false);
  }
};

export const multerConfig = {
  storage,
  limits: { fileSize: maxFileSize },
  fileFilter,
};
