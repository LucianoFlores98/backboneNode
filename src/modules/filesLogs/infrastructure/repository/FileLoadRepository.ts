import { IFileLoadRepository } from "../../core/repository/IFileLoadRepository";
import FileLogModel from "../models/FilesLogsModel";
import { IFileLog } from "../../core/entities/IFileLog";
import { IResponsePaginatedRegister } from "../../core/entities/IResponsePaginatedRegister";
import { FileTypeEnum } from "../../core/entities/FileTypeEnum";

export const FileLoadRepository = (): IFileLoadRepository => ({
  async save(file: any): Promise<any> {
    const totalItems = await FileLogModel.findAndCountAll();
    const fileCreated = await FileLogModel.create({
      id: totalItems.count + 1,
      file_name: file.file_name,
      period: file.period,
      status: false,
      type: file.type,
      processed_rows: file.processed_rows,
      fail_rows: file.fail_rows,
      error_file_name: file.error_file_name,
      createdAt: new Date(),
      updatedAt: new Date(),
      process_id: file.process_id,
    });
    return fileCreated;
  },

  async findByFileName(fileName: string): Promise<IFileLog | null> {
    const existingFile = await FileLogModel.findOne({
      where: { file_name: fileName },
    });
    return existingFile as IFileLog | null;
  },

  async getRegistersByType(
    type: string,
    page: number,
    size: number
  ): Promise<IResponsePaginatedRegister> {
    const getPagination = (page: number, size: number) => {
      const limit = size ? size : 3;
      const offset = page ? (page - 1) * limit : 0;

      return { limit, offset };
    };

    const getPagingData = (data: any, page: number, limit: number) => {
      const { count: totalItems, rows: registers } = data;
      const currentPage = page ? page : 0;
      const totalPages = Math.ceil(totalItems / limit);

      return { totalItems, registers, totalPages, currentPage };
    };

    const { limit, offset } = getPagination(page, size);

    const registers = await FileLogModel.findAndCountAll({
      limit: limit,
      offset: offset,
      where: { type: type },
    });

    const response = getPagingData(registers, page, limit);
    return response;
  },
  async updateFileStatus(
    fileName: string,
    status: boolean,
    type: FileTypeEnum
  ): Promise<IFileLog> {
    const fileUpdated = await FileLogModel.findOne({
      where: {
        file_name: fileName,
        type,
      },
    });
    await fileUpdated?.update({ status: status });
    return fileUpdated as IFileLog;
  },
  async findLatestByType(type: string): Promise<IFileLog | null> {
    const latestFile = await FileLogModel.findOne({
      where: {
        type,
        status: true,
      },
      order: [["period", "DESC"]],
    });
    return latestFile as IFileLog | null;
  },
  async findByPeriodAndType(period: string, type: string): Promise<IFileLog | null> {
    return await FileLogModel.findOne({
      where: { period, type },
    }) as IFileLog | null;
  }
});
