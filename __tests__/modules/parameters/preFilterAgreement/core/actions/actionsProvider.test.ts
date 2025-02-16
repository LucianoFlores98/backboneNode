import { getAgreementActions } from '../../../../../../src/modules/parameters/preFilterAgreement/core/actions/actionsProvider';
import { preFilterAgreementRepositoryMock, mockAgreement } from '../../mocks';

describe('getAgreementActions', () => {
  let preFilterAgreementRepositoryMockInstance: ReturnType<typeof preFilterAgreementRepositoryMock>;
  let actions: ReturnType<typeof getAgreementActions>;

  beforeEach(() => {
    preFilterAgreementRepositoryMockInstance = preFilterAgreementRepositoryMock();
    actions = getAgreementActions(preFilterAgreementRepositoryMockInstance);
  });

  it('should correctly initialize the save action', async () => {
    expect(actions.save).toBeDefined();
    expect(actions.save.execute).toBeInstanceOf(Function);

    const mockSaveResponse = { ...mockAgreement };
    preFilterAgreementRepositoryMockInstance.save.mockResolvedValue(mockSaveResponse);

    const result = await actions.save.execute(mockAgreement);

    expect(preFilterAgreementRepositoryMockInstance.save).toHaveBeenCalledWith(mockAgreement);
    expect(result).toEqual(mockSaveResponse);
  });

  it('should correctly initialize the edit action', async () => {
    expect(actions.edit).toBeDefined();
    expect(actions.edit.execute).toBeInstanceOf(Function);

    const mockEditResponse = { ...mockAgreement };
    preFilterAgreementRepositoryMockInstance.getById.mockResolvedValue(mockAgreement);
    preFilterAgreementRepositoryMockInstance.edit.mockResolvedValue(mockEditResponse);

    const result = await actions.edit.execute(mockAgreement, mockAgreement.id);

    expect(preFilterAgreementRepositoryMockInstance.edit).toHaveBeenCalledWith(mockAgreement, mockAgreement.id);
    expect(result).toEqual(mockEditResponse);
  });

  it('should correctly initialize the getAll action', async () => {
    expect(actions.getAll).toBeDefined();
    expect(actions.getAll.execute).toBeInstanceOf(Function);

    const mockGetAllResponse = [mockAgreement];
    preFilterAgreementRepositoryMockInstance.getAll.mockResolvedValue(mockGetAllResponse);

    const result = await actions.getAll.execute({});

    expect(preFilterAgreementRepositoryMockInstance.getAll).toHaveBeenCalledWith({});
    expect(result).toEqual(mockGetAllResponse);
  });

  it('should correctly initialize the getById action', async () => {
    expect(actions.getById).toBeDefined();
    expect(actions.getById.execute).toBeInstanceOf(Function);

    const mockGetByIdResponse = { ...mockAgreement };
    preFilterAgreementRepositoryMockInstance.getById.mockResolvedValue(mockGetByIdResponse);

    const result = await actions.getById.execute(mockAgreement.id);

    expect(preFilterAgreementRepositoryMockInstance.getById).toHaveBeenCalledWith(mockAgreement.id);
    expect(result).toEqual(mockGetByIdResponse);
  });

  it('should correctly initialize the remove action', async () => {
    expect(actions.remove).toBeDefined();
    expect(actions.remove.execute).toBeInstanceOf(Function);

    const mockRemoveResponse = { ...mockAgreement };
    preFilterAgreementRepositoryMockInstance.getById.mockResolvedValue(mockRemoveResponse);

    const result = await actions.remove.execute(mockAgreement.id);

    expect(preFilterAgreementRepositoryMockInstance.getById).toHaveBeenCalledWith(mockAgreement.id);
    expect(preFilterAgreementRepositoryMockInstance.remove).toHaveBeenCalledWith(mockAgreement.id);
    expect(result).toEqual(mockRemoveResponse);
  });
});
