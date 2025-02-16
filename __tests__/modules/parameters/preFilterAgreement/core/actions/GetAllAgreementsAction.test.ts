import { GetAllAgreementsAction, IGetAllAgreementsAction } from '../../../../../../src/modules/parameters/preFilterAgreement/core/actions/GetAllAgreementsAction';
import { preFilterAgreementRepositoryMock, mockAgreement } from '../../mocks';

describe('GetAllAgreementsAction', () => {
  let getAllAgreementsAction: IGetAllAgreementsAction;
  let preFilterAgreementRepositoryMockInstance: ReturnType<typeof preFilterAgreementRepositoryMock>;

  beforeEach(() => {
    preFilterAgreementRepositoryMockInstance = preFilterAgreementRepositoryMock();
    getAllAgreementsAction = GetAllAgreementsAction(preFilterAgreementRepositoryMockInstance);
  });

  it('should obtain all agreements successfully', async () => {
    const query = {}; 
    preFilterAgreementRepositoryMockInstance.getAll.mockResolvedValue([mockAgreement]);

    const result = await getAllAgreementsAction.execute(query);

    expect(preFilterAgreementRepositoryMockInstance.getAll).toHaveBeenCalledWith(query);
    expect(result).toEqual([mockAgreement]);
  });

  it('should handle errors when trying to obtain the agreements', async () => {
    const query = {};
    const error = new Error('Failed to get agreements');
    preFilterAgreementRepositoryMockInstance.getAll.mockRejectedValue(error);

    await expect(getAllAgreementsAction.execute(query)).rejects.toThrow(error);
    expect(preFilterAgreementRepositoryMockInstance.getAll).toHaveBeenCalledWith(query);
  });
});
