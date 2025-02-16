import { RemoveAgreementAction, IRemoveAgreementAction } from '../../../../../../src/modules/parameters/preFilterAgreement/core/actions/RemoveAgreementAction';
import { preFilterAgreementRepositoryMock, mockAgreement } from '../../mocks';

describe('RemoveAgreementAction', () => {
  let removeAgreementAction: IRemoveAgreementAction;
  let preFilterAgreementRepositoryMockInstance: ReturnType<typeof preFilterAgreementRepositoryMock>;

  beforeEach(() => {
    preFilterAgreementRepositoryMockInstance = preFilterAgreementRepositoryMock();
    removeAgreementAction = RemoveAgreementAction(preFilterAgreementRepositoryMockInstance);
  });

  it('should successfully remove an agreement', async () => {
    const id = mockAgreement.id;
    preFilterAgreementRepositoryMockInstance.getById.mockResolvedValue(mockAgreement);
    preFilterAgreementRepositoryMockInstance.remove.mockResolvedValue(mockAgreement);

    const result = await removeAgreementAction.execute(id);

    expect(preFilterAgreementRepositoryMockInstance.getById).toHaveBeenCalledWith(id);
    expect(preFilterAgreementRepositoryMockInstance.remove).toHaveBeenCalledWith(id);
    expect(result).toEqual(mockAgreement);
  });

  it('should throw an exception if the agreement to be deleted does not exist', async () => {
    const id = 'non-existent-id';
    preFilterAgreementRepositoryMockInstance.getById.mockResolvedValue(null);

    await expect(removeAgreementAction.execute(id)).rejects.toThrow("Convenio inexistente");
    expect(preFilterAgreementRepositoryMockInstance.getById).toHaveBeenCalledWith(id);
  });

  it('should handle unexpected errors when deleting an agreement', async () => {
    const id = mockAgreement.id;
    const error = new Error('Unexpected error');
    preFilterAgreementRepositoryMockInstance.getById.mockResolvedValue(mockAgreement);
    preFilterAgreementRepositoryMockInstance.remove.mockRejectedValue(error);

    await expect(removeAgreementAction.execute(id)).rejects.toThrow(error);
    expect(preFilterAgreementRepositoryMockInstance.getById).toHaveBeenCalledWith(id);
    expect(preFilterAgreementRepositoryMockInstance.remove).toHaveBeenCalledWith(id);
  });
});
