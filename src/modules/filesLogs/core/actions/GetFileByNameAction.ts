import path from "path";
import { IFileUploadService } from "../services/IFileUploadService";
import { InvalidTypeException } from "../exceptions/InvalidTypeException";
import { FileTypeEnum } from "../entities/FileTypeEnum";

export interface IGetFileByNameAction {
  execute(fileName: string, type: FileTypeEnum): Promise<string>;
}

export const GetFileByNameAction = (
  fileUploadService: IFileUploadService
): IGetFileByNameAction => {
  return {
    async execute(fileName, type) {
      try {
        if (!(type in FileTypeEnum)) {
          throw new InvalidTypeException();
        }
        const fileLogsPath =
          path.resolve(process.cwd() || "") + "/files/" + fileName;
        const base64 = await fileUploadService.convertToBase64(fileLogsPath);

        return Promise.resolve(base64);
      } catch (error) {
        throw error;
      }
    },
  };
};
