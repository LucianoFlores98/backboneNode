import fetchMock from "jest-fetch-mock";
import { IFileLog } from "../../../src/modules/filesLogs/core/entities/IFileLog";
import dotenv from 'dotenv';
import { FileTypeEnum } from "../../../src/modules/filesLogs/core/entities/FileTypeEnum";
import { IFileLoadRepository } from "../../../src/modules/filesLogs/core/repository/IFileLoadRepository";
import { IFileUploadService } from "../../../src/modules/filesLogs/core/services/IFileUploadService";

dotenv.config();
fetchMock.enableMocks();

export const mockFileActions = {
  save: { execute: jest.fn() },
  getFileByName: { execute: jest.fn() },
  getRegistersByType: { execute: jest.fn() },
  getLatestFilesByType: { execute: jest.fn() },
  updateFileStatus: { execute: jest.fn() },
  getErrorFile: { execute: jest.fn() },
  changeFileStatus: { execute: jest.fn() },
  getRucFileActionByName: { execute: jest.fn() },
};

export const fileRepository: jest.Mocked<IFileLoadRepository> = {
  save: jest.fn(),
  findByFileName: jest.fn(),
  getRegistersByType: jest.fn(),
  findLatestByType: jest.fn(),
  findByPeriodAndType: jest.fn(),
  updateFileStatus: jest.fn(),
};

export const fileUploadService: jest.Mocked<IFileUploadService> = {
  upload: jest.fn(),
  processFile: jest.fn(),
  convertToBase64: jest.fn(),
};

export const generateMockFile = (filename: string): Express.Multer.File => ({
  fieldname: "myFile",
  originalname: filename,
  encoding: "7bit",
  mimetype: "image/jpeg",
  size: 12345,
  destination: "uploads/",
  filename,
  path: `uploads/${filename}`,
  buffer: Buffer.from(""),
} as Express.Multer.File);

export const generateMockPeriod = (): string => {
  const randomMonth = Math.floor(Math.random() * 12) + 1;
  const randomYear = 2000 + Math.floor(Math.random() * 22);
  return `${randomYear}-${randomMonth < 10 ? `0${randomMonth}` : randomMonth}`;
};

export const newFileMock: IFileLog = {
  file_name: "newfile.txt",
  period: "2024-10",
  type: FileTypeEnum.CENDEU,
  status: true,
  processed_rows: 28,
  fail_rows: 3,
  error_file_name: "deudores-001-estracto.txt",
};

export const existingFileMock: IFileLog = {
  file_name: "example.txt",
  period: "2024-01",
  type: FileTypeEnum.CENDEU,
  status: true,
};

export const mockFileUploadResult = {
  status: true,
  message: "El archivo fue procesado exitosamente.",
  data: {
    details: {
      error_file_name: "deudores-001-estracto.txt",
      fail_rows: 3,
      processed_rows: 28,
    },
    message: "Datos procesados correctamente",
    status: "success",
  },
};

export const mockSuccessResponse = {
  status: 201,
  success: true,
  msg: "Archivo cargado con éxito.",
  result: mockFileUploadResult,
  pagination: undefined,
}

export const mockErrorResponse = {
  status: false,
  message: "Processing failed due to server error.",
  data: {
    details: {
      processed_rows: 0,
      fail_rows: 0,
      error_file_name: "error-details.txt",
    },
  },
};

export const mockFileSaveResult: IFileLog = {
  file_name: "newfile.txt",
  period: "2024-10",
  type: FileTypeEnum.CENDEU,
  status: true,
  processed_rows: 28,
  fail_rows: 3,
  error_file_name: "deudores-001-estracto.txt",
};

export const mockFileActionResult = {
  status: true,
  message: "El archivo fue procesado exitosamente.",
  data: expect.any(Object),
};
export const setupFetchMock = (mockResponse: any, status: number = 200) => {
  fetchMock.resetMocks();
  fetchMock.mockResponseOnce(JSON.stringify(mockResponse), { status });
};

export const mockRegisters = [{
  "id": 1,
  "file_name": "file1.csv",
  "type": "CENDEU",
  "period": "2024-12",
  "status": true,
  "processed_rows": 100,
  "fail_rows": 0,
  "error_file_name": null,
  "createdAt": "2024-12-01T12:00:00.000Z",
  "updatedAt": "2024-12-01T13:00:00.000Z"
},
{
  "id": 3,
  "file_name": "file3.csv",
  "type": "CENDEU",
  "period": "2024-10",
  "status": true,
  "processed_rows": 200,
  "fail_rows": 10,
  "error_file_name": null,
  "createdAt": "2024-10-20T10:00:00.000Z",
  "updatedAt": "2024-10-20T11:00:00.000Z"
},
{
  "id": 5,
  "file_name": "file5.csv",
  "type": "CENDEU",
  "period": "2024-08",
  "status": true,
  "processed_rows": 300,
  "fail_rows": 0,
  "error_file_name": null,
  "createdAt": "2024-08-05T16:00:00.000Z",
  "updatedAt": "2024-08-05T17:00:00.000Z"
}];

export const httpClientService = {
  post: jest.fn(),
  get: jest.fn(),
  put: jest.fn(),
  delete: jest.fn(),
  patch: jest.fn(),
};

export const mockHttpPostResponse = {
  status: "success",
  data: {
    processed_rows: 28,
    fail_rows: 3,
    error_file_name: "deudores-001-estracto.txt",
  },
};

export const mockExpectedResult = {
  status: true,
  message: "El archivo fue procesado exitosamente.",
  data: expect.objectContaining(newFileMock),
};

export const mockPaginatedResponse = [{ totalItems: 5, registers: mockRegisters, totalPages: 2, currentPage: 1 }];