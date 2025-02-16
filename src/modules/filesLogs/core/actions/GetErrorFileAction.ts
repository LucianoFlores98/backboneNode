import path from "path";
import fs from "fs";
import { IFileLoadRepository } from "../repository/IFileLoadRepository";
import { IFileUploadService } from "../services/IFileUploadService";

export interface IGetErrorFileAction {
    execute(period: string, type: string): Promise<{ fileName: string; base64: string }>;
}

export const GetErrorFileAction = (
    fileRepository: IFileLoadRepository,
    fileUploadService: IFileUploadService
): IGetErrorFileAction => {
    return {
        async execute(period, type) {       
            try {
                let basePath;
                const fileLog = await fileRepository.findByPeriodAndType(period, type);

                if (!fileLog || !fileLog.error_file_name) {
                    throw new Error("Archivo de error no encontrado para los parámetros especificados.");
                }

                type === "LEAD" ? 
                basePath = process.env.DATA_ERROR_LEAD 
                : basePath = process.env.DATA_ERROR_CENDEU;

                if (!basePath) {
                    throw new Error(`No se ha configurado la ruta para el tipo: ${type}`);
                }

                const filePath = path.join(basePath, fileLog.error_file_name);

                if (!fs.existsSync(filePath)) {
                    throw new Error("El archivo especificado no existe en el sistema de archivos.");
                }

                const base64 = await fileUploadService.convertToBase64(filePath);

                return {
                    fileName: fileLog.error_file_name,
                    base64,
                };
            } catch (error) {
                throw error;
            }
        },
    };
};
