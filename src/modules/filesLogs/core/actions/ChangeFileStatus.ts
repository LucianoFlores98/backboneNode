import { IFileLoadRepository } from "../repository/IFileLoadRepository";
import { FileNotFoundException } from "../exceptions/FileNotFoundException";
import { IFileLog } from "../entities/IFileLog";
import { FileTypeEnum } from "../entities/FileTypeEnum";
import { IHttpClient } from "../../../../services/httpClient/interfaces";
import { FileStatusEnum } from "../entities/FileStatusEnum";
import { processFileDecision } from "../../../../constants/api";

export interface IChangeFileStatus {
  execute(
    fileName: string,
    status: boolean,
    type: FileTypeEnum
  ): Promise<IFileLog>;
}

export const ChangeFileStatus = (
  fileRepository: IFileLoadRepository,
  httpClientService: IHttpClient
): IChangeFileStatus => {
  return {
    async execute(fileName, status, type) {
      try {
        const fileData: any = await fileRepository.findByFileName(
          fileName,
          true
        );
        if (!fileData || fileData?.file_name === null) {
          throw new FileNotFoundException("Archivo no encontrado");
        }

        const response = await httpClientService.post(processFileDecision, {
          decision: status ? FileStatusEnum.ACCEPTED : FileStatusEnum.CANCELED,
          processid: fileData.process_id,
          type: type === FileTypeEnum.LEAD ? "LEADS" : type,
        });

        if (response.status !== "success") {
          throw new Error("El procesamiento del archivo falló.");
        }
        const fileUpdated = await fileRepository.updateFileStatus(
          fileData?.file_name,
          status,
          type
        );
        return Promise.resolve(fileUpdated);
      } catch (error) {
        throw error;
      }
    },
  };
};
