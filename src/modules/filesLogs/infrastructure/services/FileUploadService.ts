import { IFileUploadService } from "../../core/services/IFileUploadService";
import { InvalidFileConversionException } from "../../core/exceptions/InvalidFileConversionException";
import fs from "fs";

export const FileUploadService = (): IFileUploadService => {
  return {
    upload(file, type) {
      return Promise.resolve(`files/${type}-${file.originalname}`);
    },
    processFile() {
      const isValid = Math.random() > 0.5;
      return Promise.resolve(isValid);
    },
    convertToBase64(path: string): Promise<string> {
      return new Promise((resolve, reject) => {
        fs.access(path, fs.constants.F_OK, (err) => {
          if (err) {
            return reject(
              new InvalidFileConversionException("Archivo no encontrado")
            );
          }
          fs.readFile(path, (readErr, data) => {
            if (readErr) {
              return reject(
                new InvalidFileConversionException("Error al leer el archivo")
              );
            }
            try {
              const base64File = data.toString("base64");
              resolve(base64File);
            } catch (conversionErr) {
              reject(
                new InvalidFileConversionException(
                  "Error al convertir el archivo"
                )
              );
            }
          });
        });
      });
    },
  };
};
