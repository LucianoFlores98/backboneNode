import { Request, Response } from "express";
import { PreFilterAgeControllers } from "../../../../../../src/modules/parameters/preFilterAge/infrastructure/controllers/PreFilterAgeControllers";
import { createMockPreFilterAgeActions, mockAge } from "../../mocks";
import { SuccessResponse } from "../../../../../../src/helpers/api";

jest.mock("../../../../../../src/helpers/api", () => ({
  SuccessResponse: jest.fn(),
  ErrorResponse: jest.fn(),
}));

describe("PreFilterAgeControllers", () => {
  let mockActions: ReturnType<typeof createMockPreFilterAgeActions>;
  let req: Partial<Request>;
  let res: Partial<Response>;
  let controllers: ReturnType<typeof PreFilterAgeControllers>;

  beforeEach(() => {
    mockActions = createMockPreFilterAgeActions();
    req = { body: mockAge, params: { id: mockAge.id }, query: {} };
    res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    controllers = PreFilterAgeControllers(mockActions);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

    it("should save age and return success response", async () => {
      (mockActions.save.execute as jest.Mock).mockResolvedValue(mockAge);

      await controllers.save(req as Request, res as Response);

      expect(mockActions.save.execute).toHaveBeenCalledWith(req.body);
      expect(SuccessResponse).toHaveBeenCalledWith(
        res,
        201,
        expect.any(String),
        mockAge
      );
    });

    it("should edit age and return success response", async () => {
      (mockActions.edit.execute as jest.Mock).mockResolvedValue(mockAge);

      await controllers.edit(req as Request, res as Response);

      expect(mockActions.edit.execute).toHaveBeenCalledWith(
        req.body,
        req.params?.id
      );
      expect(SuccessResponse).toHaveBeenCalledWith(
        res,
        200,
        expect.any(String),
        mockAge
      );
    });

    it("should get all ages and return success response", async () => {
      (mockActions.getAll.execute as jest.Mock).mockResolvedValue([mockAge]);

      await controllers.getAll(req as Request, res as Response);

      expect(mockActions.getAll.execute).toHaveBeenCalledWith(req.query);
      expect(SuccessResponse).toHaveBeenCalledWith(
        res,
        200,
        expect.any(String),
        [mockAge]
      );
    });

    it("should get age by id and return success response", async () => {
      (mockActions.getById.execute as jest.Mock).mockResolvedValue(mockAge);

      await controllers.getById(req as Request, res as Response);

      expect(mockActions.getById.execute).toHaveBeenCalledWith(req.params?.id);
      expect(SuccessResponse).toHaveBeenCalledWith(
        res,
        200,
        expect.any(String),
        mockAge
      );
    });

    it("should remove age by id and return success response", async () => {
      (mockActions.remove.execute as jest.Mock).mockResolvedValue(mockAge);

      await controllers.remove(req as Request, res as Response);

      expect(mockActions.remove.execute).toHaveBeenCalledWith(req.params?.id);
      expect(SuccessResponse).toHaveBeenCalledWith(
        res,
        200,
        expect.any(String),
        mockAge
      );
    });
  });
