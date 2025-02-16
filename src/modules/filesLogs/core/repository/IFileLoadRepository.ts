import { FileTypeEnum } from "../entities/FileTypeEnum";
import { IFileLog } from "../entities/IFileLog";
import { IResponsePaginatedRegister } from "../entities/IResponsePaginatedRegister";
export interface IFileLoadRepository {
  save: (user: IFileLog) => Promise<IFileLog>;
  findByFileName(fileName: string, status: boolean): Promise<IFileLog | null>;
  getRegistersByType(
    type: any,
    page?: number,
    size?: number
  ): Promise<IResponsePaginatedRegister>;
  findLatestByType(type: string): Promise<IFileLog | null>;
  updateFileStatus(
    fileName: string,
    status: boolean,
    type: FileTypeEnum
  ): Promise<IFileLog>;
  findByPeriodAndType(
    period: string,
    type: string
  ): Promise<IFileLog | null>
}
