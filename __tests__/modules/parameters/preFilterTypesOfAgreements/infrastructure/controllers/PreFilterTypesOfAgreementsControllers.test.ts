import { Request, Response } from "express";
import { PreFilterTypeOfAgreementsControllers } from "../../../../../../src/modules/parameters/preFilterTypesOfAgreements/infrastructure/controllers/PreFilterTypesOfAgreementsControllers";
import { SuccessResponse } from "../../../../../../src/helpers/api";
import { MockPreFilterTypeOfAgreementActions, PreFilterTypeOfAgreementsControllersType, createMockPreFilterTypeOfAgreementActions, mockPreFilterType } from "../../mocks";

jest.mock("../../../../../../src/helpers/api", () => ({
    SuccessResponse: jest.fn(),
    ErrorResponse: jest.fn(),
}));

describe("PreFilterTypeOfAgreementsControllers", () => {
    let mockActions: MockPreFilterTypeOfAgreementActions;
    let controllers: PreFilterTypeOfAgreementsControllersType;
    let req: Partial<Request>;
    let res: Partial<Response>;

    beforeEach(() => {
        mockActions = createMockPreFilterTypeOfAgreementActions();
        req = { body: mockPreFilterType, params: { id: mockPreFilterType.id }, query: {} };
        res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        controllers = PreFilterTypeOfAgreementsControllers(mockActions);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should save a type of agreement and return success response", async () => {
        (mockActions.save.execute as jest.Mock).mockResolvedValue(mockPreFilterType);

        await controllers.save(req as Request, res as Response);

        expect(mockActions.save.execute).toHaveBeenCalledWith(req.body);
        expect(SuccessResponse).toHaveBeenCalledWith(
            res,
            201,
            expect.any(String),
            mockPreFilterType
        );
    });

    it("should edit a type of agreement and return success response", async () => {
        (mockActions.edit.execute as jest.Mock).mockResolvedValue(mockPreFilterType);

        await controllers.edit(req as Request, res as Response);

        expect(mockActions.edit.execute).toHaveBeenCalledWith(
            req.body,
            req.params?.id
        );
        expect(SuccessResponse).toHaveBeenCalledWith(
            res,
            200,
            expect.any(String),
            mockPreFilterType
        );
    });

    it("should get all types of agreements and return success response", async () => {
        (mockActions.getAll.execute as jest.Mock).mockResolvedValue([mockPreFilterType]);

        await controllers.getAll(req as Request, res as Response);

        expect(mockActions.getAll.execute).toHaveBeenCalledWith(req.query);
        expect(SuccessResponse).toHaveBeenCalledWith(
            res,
            200,
            expect.any(String),
            [mockPreFilterType]
        );
    });

    it("should get a type of agreement by id and return success response", async () => {
        (mockActions.getById.execute as jest.Mock).mockResolvedValue(mockPreFilterType);

        await controllers.getById(req as Request, res as Response);

        expect(mockActions.getById.execute).toHaveBeenCalledWith(req.params?.id);
        expect(SuccessResponse).toHaveBeenCalledWith(
            res,
            200,
            expect.any(String),
            mockPreFilterType
        );
    });

    it("should remove a type of agreement by id and return success response", async () => {
        (mockActions.remove.execute as jest.Mock).mockResolvedValue(mockPreFilterType);

        await controllers.remove(req as Request, res as Response);

        expect(mockActions.remove.execute).toHaveBeenCalledWith(req.params?.id);
        expect(SuccessResponse).toHaveBeenCalledWith(
            res,
            200,
            expect.any(String),
            mockPreFilterType
        );
    });
});
