import {PreFilterControllers} from "../../../../../../src/modules/parameters/preFilterPipe/infrastructure/controllers/PreFilterPipeControllers";
import { createMockPreFilterPipeActions, mockPipe } from "../../mocks";
import { Request, Response } from "express";
import { SuccessResponse } from "../../../../../../src/helpers/api";

jest.mock("../../../../../../src/helpers/api", () => ({
  SuccessResponse: jest.fn(),
  ErrorResponse: jest.fn(),
}));

describe("PreFilterControllers", () => {
  let mockActions = createMockPreFilterPipeActions();
  let req: Partial<Request>;
  let res: Partial<Response>;
  let controllers: ReturnType<typeof PreFilterControllers>;

  beforeEach(() => {
    req = { body: mockPipe, params: { id: mockPipe.id }, query: {} };
    res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    controllers = PreFilterControllers(mockActions);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

    it("should create a new pipe", async () => {
      mockActions.save.execute.mockResolvedValueOnce(mockPipe);

      await controllers.save(req as Request, res as Response);

      expect(SuccessResponse).toHaveBeenCalledWith(res, 201, "Pipe creado correctamente", mockPipe);
    });

    it("should edit a pipe", async () => {
      mockActions.edit.execute.mockResolvedValueOnce(mockPipe);

      await controllers.edit(req as Request, res as Response);

      expect(SuccessResponse).toHaveBeenCalledWith(res, 200, "Pipe editado correctamente", mockPipe);
    });

    it("should get all pipes", async () => {
      mockActions.getAll.execute.mockResolvedValueOnce([mockPipe]);

      await controllers.getAll(req as Request, res as Response);

      expect(SuccessResponse).toHaveBeenCalledWith(res, 200, "Pipes obtenidos correctamente", [mockPipe]);
    });

    it("should get a pipe by id", async () => {
      mockActions.getById.execute.mockResolvedValueOnce(mockPipe);

      await controllers.getById(req as Request, res as Response);

      expect(SuccessResponse).toHaveBeenCalledWith(res, 200, "Pipe obtenido correctamente", mockPipe);
    });

    it("should delete a pipe", async () => {
      mockActions.remove.execute.mockResolvedValueOnce(mockPipe);

      await controllers.remove(req as Request, res as Response);

      expect(SuccessResponse).toHaveBeenCalledWith(res, 200, "Pipe eliminado correctamente", mockPipe);
    });
});
