import { IFileLoadRepository } from "../repository/IFileLoadRepository";
import { IFileUploadService } from "../services/IFileUploadService";
import { FileAlreadyExistsException } from "../exceptions/FileAlreadyExistsException";
import { InvalidTypeException } from "../exceptions/InvalidTypeException";
import { FileTypeEnum } from "../entities/FileTypeEnum";
import { MissingParamsException } from "../exceptions/MissingParamsException";
import { IHttpClient } from "../../../../services/httpClient/interfaces";
import {
  pythonServiceCendeu,
  pythonServiceLeads,
} from "../../../../constants/api";
import { InvalidPeriodException } from "../exceptions/InvalidPeriodException";

export interface ISaveFileAction {
  execute(
    file: Express.Multer.File | undefined,
    period: string,
    type: FileTypeEnum
  ): Promise<{ status: boolean; message: string; data?: any }>;
}

export const SaveFileAction = (
  fileRepository: IFileLoadRepository,
  fileUploadService: IFileUploadService,
  httpClientService: IHttpClient
): ISaveFileAction => {
  return {
    async execute(
      file: Express.Multer.File,
      period: string,
      type: FileTypeEnum
    ): Promise<{ status: boolean; message: string; data?: any }> {
      try {
        if (!file || !period || !type) {
          throw new MissingParamsException();
        }

        if (!(type in FileTypeEnum)) {
          throw new InvalidTypeException();
        }

        const existingFile = await fileRepository.findByFileName(
          file.originalname,
          true
        );
        if (existingFile) {
          throw new FileAlreadyExistsException(
            "El archivo ya ha sido cargado y procesado con éxito anteriormente."
          );
        }

        await fileUploadService.upload(file, type);

        const pythonServiceUrl =
          type === FileTypeEnum.CENDEU
            ? pythonServiceCendeu
            : pythonServiceLeads;

        let response;
        try {
          response = await httpClientService.post(pythonServiceUrl, {
            file_name: file.originalname,
            period: `${period.split("-")[1]}-${period.split("-")[0]}`,
          });
          const body = {
            file_name: file.filename,
            period,
            type,
            status: response.status === "success",
            processed_rows: response?.data?.processed_rows,
            fail_rows: response?.data?.fail_rows,
            error_file_name: response?.data?.error_file_name,
            process_id: response?.data?.process_id,
          };
          await fileRepository.save(body);
          return {
            status: true,
            message: "El archivo fue procesado exitosamente.",
            data: body,
          };
        } catch (err: any) {
          if (err?.search("period")) {
            throw new InvalidPeriodException("Los períodos no coinciden.");
          }
          return Promise.reject("El procesamiento del archivo falló.");
        }
      } catch (error) {
        return Promise.reject(error);
      }
    },
  };
};
