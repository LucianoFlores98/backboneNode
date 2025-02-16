import { GetAgreementByIdAction, IGetAgreementByIdAction } from '../../../../../../src/modules/parameters/preFilterAgreement/core/actions/GetAgreementByIdAction';
import { preFilterAgreementRepositoryMock, mockAgreement } from '../../mocks';

describe('GetAgreementByIdAction', () => {
  let getAgreementByIdAction: IGetAgreementByIdAction;
  let preFilterAgreementRepositoryMockInstance: ReturnType<typeof preFilterAgreementRepositoryMock>;

  beforeEach(() => {
    preFilterAgreementRepositoryMockInstance = preFilterAgreementRepositoryMock();
    getAgreementByIdAction = GetAgreementByIdAction(preFilterAgreementRepositoryMockInstance);
  });

  it('should successfully obtain an agreement by id', async () => {
    const id = mockAgreement.id;
    preFilterAgreementRepositoryMockInstance.getById.mockResolvedValue(mockAgreement);

    const result = await getAgreementByIdAction.execute(id);

    expect(preFilterAgreementRepositoryMockInstance.getById).toHaveBeenCalledWith(id);
    expect(result).toEqual(mockAgreement);
  });

  it('should throw an exception if the agreement does not exist', async () => {
    const id = 'non-existent-id';
    preFilterAgreementRepositoryMockInstance.getById.mockResolvedValue(null);

    await expect(getAgreementByIdAction.execute(id)).rejects.toThrow("Convenio inexistente");
    expect(preFilterAgreementRepositoryMockInstance.getById).toHaveBeenCalledWith(id);
  });

  it('should handle unexpected errors when obtaining an agreement by id', async () => {
    const id = mockAgreement.id;
    const error = new Error('Unexpected error');
    preFilterAgreementRepositoryMockInstance.getById.mockRejectedValue(error);

    await expect(getAgreementByIdAction.execute(id)).rejects.toThrow(error);
    expect(preFilterAgreementRepositoryMockInstance.getById).toHaveBeenCalledWith(id);
  });
});
