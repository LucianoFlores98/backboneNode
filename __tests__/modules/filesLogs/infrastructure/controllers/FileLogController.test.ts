import { describe, it, expect } from '@jest/globals';
import { Request, Response } from "express";
import { FileLogControllers } from "../../../../../src/modules/filesLogs/infrastructure/controllers/FileLogController";
import { generateMockFile, generateMockPeriod, mockSuccessResponse, mockFileUploadResult, mockFileActions, mockPaginatedResponse } from "../../mocks";
import { InvalidFileException } from "../../../../../src/modules/filesLogs/core/exceptions/InvalidException";
import { FileAlreadyExistsException } from '../../../../../src/modules/filesLogs/core/exceptions/FileAlreadyExistsException';

describe("FileLogControllers", () => {

  const { uploadFile } = FileLogControllers(mockFileActions);
  const { getRegistersByType } = FileLogControllers(mockFileActions);
  const { getErrorFile } = FileLogControllers(mockFileActions);

  let req: Partial<Request>;
  let res: Partial<Response>;

  let reqRegister: Partial<Request>;
  let resRegister: Partial<Response>;

  beforeEach(() => {
    req = { file: undefined, body: {} };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    reqRegister = { query: {} };
    resRegister = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    jest.clearAllMocks();
  });

  it("should return 400 if no file is provided", async () => {
    req.body = { period: generateMockPeriod(), type: "someType" };

    await uploadFile(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ msg: "El archivo no fue provisto, o tipo de archivo inválido." });
    expect(mockFileActions.save.execute).not.toHaveBeenCalled();
  });

  it("should return 400 if no period is provided", async () => {
    req.file = generateMockFile("example.txt");
    req.body = { type: "someType" };

    await uploadFile(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ msg: "Período no provisto." });
    expect(mockFileActions.save.execute).not.toHaveBeenCalled();
  });

  it("should upload file successfully when all parameters are provided", async () => {
    const period = generateMockPeriod();
    const type = "someType";
    req.file = generateMockFile("example.txt");
    req.body = { period, type };
  
    (mockFileActions.save.execute as jest.Mock).mockResolvedValueOnce(mockSuccessResponse.result);
  
    await uploadFile(req as Request, res as Response);
  
    expect(mockFileActions.save.execute).toHaveBeenCalledWith(req.file, period, type);
    expect(res.status).toHaveBeenCalledWith(mockSuccessResponse.status);
    expect(res.json).toHaveBeenCalledWith(mockSuccessResponse);
  });

  it("should handle InvalidFileException with 500 status", async () => {
    req.file = generateMockFile("example.txt");
    req.body = { period: generateMockPeriod(), type: "someType" };

    (mockFileActions.save.execute as jest.Mock).mockRejectedValueOnce(new InvalidFileException("Archivo inválido."));

    await uploadFile(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      status: 500,
      success: false,
      msg: "Archivo inválido.",
      result: null,
      pagination: null,
    });
  });

  it("should handle FileAlreadyExistsException with 500 status", async () => {
    req.file = generateMockFile("example.txt");
    req.body = { period: generateMockPeriod(), type: "someType" };

    (mockFileActions.save.execute as jest.Mock).mockRejectedValueOnce(new FileAlreadyExistsException("File already exists"));

    await uploadFile(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      status: 500,
      success: false,
      msg: "File already exists",
      result: null,
      pagination: null,
    });
  });

  it("should return paginated data when valid type is provided", async () => {
    reqRegister.query = { type: "exampleType", page: "1", size: "10" };
    const expectedResponse = mockPaginatedResponse;

    (mockFileActions.getRegistersByType.execute as jest.Mock).mockResolvedValueOnce(expectedResponse);

    await getRegistersByType(reqRegister as Request, res as Response);

    expect(mockFileActions.getRegistersByType.execute).toHaveBeenCalledWith(
      "exampleType",
      "1",
      "10"
    );
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      status: 200,
      success: true,
      msg: "Registros procesados de exampleType obtenidos correctamente",
      result: expectedResponse,
    });
  });

  it("should return success response if getErrorFile executes successfully", async () => {
    const period = generateMockPeriod();
    const type = "CENDEU";
    const result = { data: "data" };
    req.body = { period, type };

    (mockFileActions.getErrorFile.execute as jest.Mock).mockResolvedValueOnce(result);

    await getErrorFile(req as Request, res as Response);

    expect(mockFileActions.getErrorFile.execute).toHaveBeenCalledWith(period, type);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      status: 200,
      success: true,
      msg: "Archivo recuperado con éxito.",
      result,
    });
  });

});
