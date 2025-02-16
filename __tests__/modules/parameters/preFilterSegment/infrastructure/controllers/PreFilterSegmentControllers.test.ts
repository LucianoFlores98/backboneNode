import { Request, Response } from "express";
import { PreFilterSegmentControllers } from "../../../../../../src/modules/parameters/preFilterSegment/infrastructure/controllers/PreFilterSegmentControllers";
import { createMockPreFilterSegmentActions, mockSegment } from "../../mocks";
import { SuccessResponse } from "../../../../../../src/helpers/api";

jest.mock("../../../../../../src/helpers/api", () => ({
  SuccessResponse: jest.fn(),
  ErrorResponse: jest.fn(),
}));

describe("PreFilterSegmentControllers", () => {
  let mockActions: ReturnType<typeof createMockPreFilterSegmentActions>;
  let req: Partial<Request>;
  let res: Partial<Response>;
  let controllers: ReturnType<typeof PreFilterSegmentControllers>;

  beforeEach(() => {
    mockActions = createMockPreFilterSegmentActions();
    req = { body: mockSegment, params: { id: mockSegment.id.toString() }, query: {} };
    res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    controllers = PreFilterSegmentControllers(mockActions);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

    it("should save Segment and return success response", async () => {
      (mockActions.save.execute as jest.Mock).mockResolvedValue(mockSegment);

      await controllers.save(req as Request, res as Response);

      expect(mockActions.save.execute).toHaveBeenCalledWith(req.body);
      expect(SuccessResponse).toHaveBeenCalledWith(
        res,
        201,
        expect.any(String),
        mockSegment
      );
    });

    it("should edit Segment and return success response", async () => {
      (mockActions.edit.execute as jest.Mock).mockResolvedValue(mockSegment);

      await controllers.edit(req as Request, res as Response);
      const id = Number(req.params?.id) || 0;
      expect(mockActions.edit.execute).toHaveBeenCalledWith(
        req.body,
        id
      );
      expect(SuccessResponse).toHaveBeenCalledWith(
        res,
        200,
        expect.any(String),
        mockSegment
      );
    });

    it("should get all Segments and return success response", async () => {
      (mockActions.getAll.execute as jest.Mock).mockResolvedValue([mockSegment]);

      await controllers.getAll(req as Request, res as Response);

      expect(mockActions.getAll.execute).toHaveBeenCalledWith(req.query);
      expect(SuccessResponse).toHaveBeenCalledWith(
        res,
        200,
        expect.any(String),
        [mockSegment]
      );
    });

    it("should get Segment by id and return success response", async () => {
      (mockActions.getById.execute as jest.Mock).mockResolvedValue(mockSegment);

      await controllers.getById(req as Request, res as Response);

      const id = Number(req.params?.id); // Convertir a número
      const getByIdExecution = await mockActions.getById?.execute?.(id);

      if (!getByIdExecution) {
          throw new Error("getById.execute is undefined or returned null");
      }

      expect(mockActions.getById.execute).toHaveBeenCalledWith(id);
      expect(SuccessResponse).toHaveBeenCalledWith(
        res,
        200,
        expect.any(String),
        mockSegment
      );
    });
    
    it("should remove Segment and return success response", async () => {
      (mockActions.remove.execute as jest.Mock).mockResolvedValue(mockSegment);
  
      await controllers.remove(req as Request, res as Response);
  
      const id = Number(req.params?.id) || 0;
      expect(mockActions.remove.execute).toHaveBeenCalledWith(id);
      expect(SuccessResponse).toHaveBeenCalledWith(
        res,
        200,
        expect.any(String),
        mockSegment
      );
    });
    
  });
