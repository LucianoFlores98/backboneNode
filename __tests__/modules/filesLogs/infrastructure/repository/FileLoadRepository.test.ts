import { FileLoadRepository } from "../../../../../src/modules/filesLogs/infrastructure/repository/FileLoadRepository";
import FileLogModel from "../../../../../src/modules/filesLogs/infrastructure/models/FilesLogsModel";
import { newFileMock, existingFileMock } from "../../mocks";

jest.mock("../../../../../src/modules/filesLogs/infrastructure/models/FilesLogsModel");

describe("FileLoadRepository", () => {
  let repository: ReturnType<typeof FileLoadRepository>;

  beforeEach(() => {
    repository = FileLoadRepository();
    jest.clearAllMocks();
  });

    it("should save a file and return it", async () => {
      (FileLogModel.findAndCountAll as jest.Mock).mockResolvedValue({ count: 5, rows: [] });
      (FileLogModel.create as jest.Mock).mockResolvedValue(newFileMock);

      const result = await repository.save(newFileMock);
      
      expect(FileLogModel.findAndCountAll).toHaveBeenCalled();
      expect(FileLogModel.create).toHaveBeenCalledWith({
        id: 6,
        file_name: newFileMock.file_name,
        period: newFileMock.period,
        status: newFileMock.status,
        type: newFileMock.type,
        error_file_name: newFileMock.error_file_name,
        fail_rows: newFileMock.fail_rows,
        processed_rows: newFileMock.processed_rows,
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      });
      expect(result).toEqual(newFileMock);
    });

    it("should find a file by its name and with status equals to true", async () => {
      (FileLogModel.findOne as jest.Mock).mockResolvedValue(existingFileMock);

      const result = await repository.findByFileName(existingFileMock.file_name || "", true);

      expect(FileLogModel.findOne).toHaveBeenCalledWith({
        where: { file_name: existingFileMock.file_name, status: true },
      });
      expect(result).toEqual(existingFileMock);
    });

    it("should return null if it does not find the file", async () => {
      (FileLogModel.findOne as jest.Mock).mockResolvedValue(null);

      const result = await repository.findByFileName("nonexistent.txt", false);

      expect(FileLogModel.findOne).toHaveBeenCalledWith({
        where: { file_name: "nonexistent.txt", status: false },
      });
      expect(result).toBeNull();
    });

    it("should find a file by period and type", async () => {
      (FileLogModel.findOne as jest.Mock).mockResolvedValue(existingFileMock);
  
      const result = await repository.findByPeriodAndType(existingFileMock.period!, existingFileMock.type!);
  
      expect(FileLogModel.findOne).toHaveBeenCalledWith({
        where: { period: existingFileMock.period, type: existingFileMock.type },
      });
      expect(result).toEqual(existingFileMock);
    });
  
    it("should return null if it does not find a file by period and type", async () => {
      (FileLogModel.findOne as jest.Mock).mockResolvedValue(null);
  
      const result = await repository.findByPeriodAndType("2023-01", "CENDEU");
  
      expect(FileLogModel.findOne).toHaveBeenCalledWith({
        where: { period: "2023-01", type: "CENDEU" },
      });
      expect(result).toBeNull();
    });
});
