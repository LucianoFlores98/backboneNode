import { EditAgreementAction, IEditAgreementAction } from '../../../../../../src/modules/parameters/preFilterAgreement/core/actions/EditAgreementAction';
import { preFilterAgreementRepositoryMock, mockAgreement } from '../../mocks';

describe('EditAgreementAction', () => {
  let editAgreementAction: IEditAgreementAction;
  let preFilterAgreementRepositoryMockInstance: ReturnType<typeof preFilterAgreementRepositoryMock>;

  beforeEach(() => {
    preFilterAgreementRepositoryMockInstance = preFilterAgreementRepositoryMock();
    editAgreementAction = EditAgreementAction(preFilterAgreementRepositoryMockInstance);
  });

  it('should successfully edit an agreement', async () => {
    const id = mockAgreement.id;
    const updatedAgreement = { ...mockAgreement, value: '40' };
    preFilterAgreementRepositoryMockInstance.getById.mockResolvedValueOnce(mockAgreement);
    preFilterAgreementRepositoryMockInstance.edit.mockResolvedValue(updatedAgreement);
    preFilterAgreementRepositoryMockInstance.getById.mockResolvedValueOnce(updatedAgreement);

    const result = await editAgreementAction.execute(updatedAgreement, id);

    expect(preFilterAgreementRepositoryMockInstance.getById).toHaveBeenCalledWith(id);
    expect(preFilterAgreementRepositoryMockInstance.edit).toHaveBeenCalledWith(updatedAgreement, id);
    expect(preFilterAgreementRepositoryMockInstance.getById).toHaveBeenCalledWith(id);
    expect(result).toEqual(updatedAgreement);
  });

  it('should throw an exception if the agreement to be edited does not exist', async () => {
    const id = 'non-existent-id';
    preFilterAgreementRepositoryMockInstance.getById.mockResolvedValueOnce(null);

    await expect(editAgreementAction.execute(mockAgreement, id)).rejects.toThrow("Convenio inexistente");
    expect(preFilterAgreementRepositoryMockInstance.getById).toHaveBeenCalledWith(id);
  });

  it('should handle unexpected errors when editing an agreement', async () => {
    const id = mockAgreement.id;
    const error = new Error('Unexpected error');
    preFilterAgreementRepositoryMockInstance.getById.mockResolvedValueOnce(mockAgreement);
    preFilterAgreementRepositoryMockInstance.edit.mockRejectedValue(error);

    await expect(editAgreementAction.execute(mockAgreement, id)).rejects.toThrow(error);
    expect(preFilterAgreementRepositoryMockInstance.getById).toHaveBeenCalledWith(id);
    expect(preFilterAgreementRepositoryMockInstance.edit).toHaveBeenCalledWith(mockAgreement, id);
  });
});
