import { describe, beforeEach, expect, jest } from "@jest/globals";
import { SaveFileAction } from "../../../../../src/modules/filesLogs/core/actions/UploadFileAction";
import {
  fileRepository,
  fileUploadService,
  generateMockFile,
  generateMockPeriod,
  existingFileMock,
  newFileMock,
  mockErrorResponse,
  mockFileUploadResult,
  httpClientService,
  setupFetchMock,
  mockHttpPostResponse,
  mockExpectedResult,
} from "../../mocks";
import { FileTypeEnum } from "../../../../../src/modules/filesLogs/core/entities/FileTypeEnum";

describe("SaveFileAction", () => {
  const saveFileAction = SaveFileAction(fileRepository, fileUploadService, httpClientService);

  beforeEach(() => {
    jest.clearAllMocks();
    setupFetchMock(mockFileUploadResult);
  });

  it("should throw FileAlreadyExistsException if file already exists with status true", async () => {
    const file = generateMockFile("example.txt");
    const period = generateMockPeriod();
    const type = FileTypeEnum.LEAD;

    fileRepository.findByFileName.mockResolvedValueOnce(existingFileMock);

    await expect(saveFileAction.execute(file, period, type)).rejects.toThrow(
      "El archivo ya ha sido cargado y procesado con éxito anteriormente."
    );
    expect(fileRepository.findByFileName).toHaveBeenCalledWith(file.originalname, true);
    expect(fileUploadService.upload).not.toHaveBeenCalled();
  });

  it("should throw an error if file processing fails", async () => {
    const file = generateMockFile("errorfile.txt");
    const period = generateMockPeriod();
    const type = FileTypeEnum.CENDEU;

    fileRepository.findByFileName.mockResolvedValueOnce(null);
    fileUploadService.upload.mockResolvedValueOnce("");
    httpClientService.post.mockResolvedValueOnce(mockErrorResponse);

    fileRepository.save.mockResolvedValueOnce(newFileMock);

    await expect(saveFileAction.execute(file, period, type)).rejects.toThrow(
      "El procesamiento del archivo falló."
    );

    expect(fileRepository.findByFileName).toHaveBeenCalledWith(file.originalname, true);
    expect(fileUploadService.upload).toHaveBeenCalledWith(file, type);
    expect(httpClientService.post).toHaveBeenCalledWith(expect.any(String), {
      file_name: file.originalname,
    });
    expect(fileRepository.save).not.toHaveBeenCalled();
  });

  it("should save and process new valid file", async () => {
    fileRepository.findByFileName.mockResolvedValueOnce(null);
    fileUploadService.upload.mockResolvedValueOnce("");
    httpClientService.post.mockResolvedValueOnce(mockHttpPostResponse);
    fileRepository.save.mockResolvedValueOnce(newFileMock);
  
    const file = generateMockFile("newfile.txt");
    const result = await saveFileAction.execute(file, "2024-10", FileTypeEnum.CENDEU);
  
    expect(result).toEqual(mockExpectedResult);
    expect(fileRepository.findByFileName).toHaveBeenCalledWith("newfile.txt", true);
    expect(fileUploadService.upload).toHaveBeenCalledWith(file, FileTypeEnum.CENDEU);
    expect(httpClientService.post).toHaveBeenCalledWith(expect.any(String), {
      file_name: file.originalname,
    });
    expect(fileRepository.save).toHaveBeenCalledWith(expect.objectContaining(newFileMock));
  });
})