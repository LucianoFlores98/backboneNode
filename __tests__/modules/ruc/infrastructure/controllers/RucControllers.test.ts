import { RucControllers } from "../../../../../src/modules/ruc/infrastructure/controllers/RucControllers";
import { createMockRucActions, mockRuc, createMockRequest, createMockResponse } from "../../mocks";
import { Request, Response } from "express";
import { SuccessResponse } from "../../../../../src/helpers/api";

jest.mock("../../../../../src/helpers/api", () => ({
    SuccessResponse: jest.fn(),
    ErrorResponse: jest.fn(),
}));

describe("RucControllers", () => {
    let mockActions: ReturnType<typeof createMockRucActions>;
    let req: Partial<Request>;
    let res: Partial<Response>;
    let controllers: ReturnType<typeof RucControllers>;

    beforeEach(() => {
        jest.clearAllMocks();
        mockActions = createMockRucActions();
        req = createMockRequest(mockRuc, {});
        res = createMockResponse();
        controllers = RucControllers(mockActions);
    });

    it("should save a new RUC register and return success response", async () => {
        mockActions.save.execute.mockResolvedValueOnce(mockRuc);

        await controllers.save(req as Request, res as Response);

        expect(mockActions.save.execute).toHaveBeenCalledWith(mockRuc);
        expect(SuccessResponse).toHaveBeenCalledWith(
            res,
            201,
            "Registro de RUC creado correctamente.",
            mockRuc
        );
    })

    it("should get all RUCs registers and return success response", async () => {
        const mockRegisters = [mockRuc];
        mockActions.getAll.execute.mockResolvedValueOnce(mockRegisters);

        await controllers.getAll(req as Request, res as Response);

        expect(mockActions.getAll.execute).toHaveBeenCalledWith({});
        expect(SuccessResponse).toHaveBeenCalledWith(
            res,
            200,
            "Registros de RUC obtenidos correctamente",
            mockRegisters
        );
    });
});
