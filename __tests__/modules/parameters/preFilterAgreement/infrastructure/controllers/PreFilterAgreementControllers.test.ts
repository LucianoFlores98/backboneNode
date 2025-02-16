import { Request, Response } from 'express';
import { PreFilterAgreementControllers } from '../../../../../../src/modules/parameters/preFilterAgreement/infrastructure/controllers/PreFilterAgreementControllers';
import { createMockPreFilterAgreementActions, mockAgreement } from '../../mocks';
import { SuccessResponse } from '../../../../../../src/helpers/api';

jest.mock('../../../../../../src/helpers/api', () => ({
  SuccessResponse: jest.fn(),
  ErrorResponse: jest.fn(),
}));

describe("PreFilterAgreementsControllers", () => {
    let mockActions: ReturnType<typeof createMockPreFilterAgreementActions>;
    let req: Partial<Request>;
    let res: Partial<Response>;
    let controllers: ReturnType<typeof PreFilterAgreementControllers>;
  
    beforeEach(() => {
      mockActions = createMockPreFilterAgreementActions();
      req = { body: mockAgreement, params: { id: mockAgreement.id }, query: {} };
      res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      controllers = PreFilterAgreementControllers(mockActions);
    });
  
    afterEach(() => {
      jest.clearAllMocks();
    });
  
      it("should save agreement and return success response", async () => {
        (mockActions.save.execute as jest.Mock).mockResolvedValue(mockAgreement);
  
        await controllers.save(req as Request, res as Response);
  
        expect(mockActions.save.execute).toHaveBeenCalledWith(req.body);
        expect(SuccessResponse).toHaveBeenCalledWith(
          res,
          201,
          expect.any(String),
          mockAgreement
        );
      });
  
      it("should edit agreement and return success response", async () => {
        (mockActions.edit.execute as jest.Mock).mockResolvedValue(mockAgreement);
  
        await controllers.edit(req as Request, res as Response);
  
        expect(mockActions.edit.execute).toHaveBeenCalledWith(
          req.body,
          req.params?.id
        );
        expect(SuccessResponse).toHaveBeenCalledWith(
          res,
          200,
          expect.any(String),
          mockAgreement
        );
      });
  
      it("should get all agreements and return success response", async () => {
        (mockActions.getAll.execute as jest.Mock).mockResolvedValue([mockAgreement]);
  
        await controllers.getAll(req as Request, res as Response);
  
        expect(mockActions.getAll.execute).toHaveBeenCalledWith(req.query);
        expect(SuccessResponse).toHaveBeenCalledWith(
          res,
          200,
          expect.any(String),
          [mockAgreement]
        );
      });
  
      it("should get agreement by id and return success response", async () => {
        (mockActions.getById.execute as jest.Mock).mockResolvedValue(mockAgreement);
  
        await controllers.getById(req as Request, res as Response);
  
        expect(mockActions.getById.execute).toHaveBeenCalledWith(req.params?.id);
        expect(SuccessResponse).toHaveBeenCalledWith(
          res,
          200,
          expect.any(String),
          mockAgreement
        );
      });
  
      it("should remove agreement by id and return success response", async () => {
        (mockActions.remove.execute as jest.Mock).mockResolvedValue(mockAgreement);
  
        await controllers.remove(req as Request, res as Response);
  
        expect(mockActions.remove.execute).toHaveBeenCalledWith(req.params?.id);
        expect(SuccessResponse).toHaveBeenCalledWith(
          res,
          200,
          expect.any(String),
          mockAgreement
        );
      });
    });
  