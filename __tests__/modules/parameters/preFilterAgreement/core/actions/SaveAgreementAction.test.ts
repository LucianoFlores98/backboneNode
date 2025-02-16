import { SaveAgreementAction, ISaveAgreementAction } from '../../../../../../src/modules/parameters/preFilterAgreement/core/actions/SaveAgreementAction';
import { preFilterAgreementRepositoryMock, mockAgreement } from '../../mocks';

describe('SaveAgreementAction', () => {
  let saveAgreementAction: ISaveAgreementAction;
  let preFilterAgreementRepositoryMockInstance: ReturnType<typeof preFilterAgreementRepositoryMock>;

  beforeEach(() => {
    preFilterAgreementRepositoryMockInstance = preFilterAgreementRepositoryMock();
    saveAgreementAction = SaveAgreementAction(preFilterAgreementRepositoryMockInstance);
  });

  it('should successfully save an agreement', async () => {
    preFilterAgreementRepositoryMockInstance.save.mockResolvedValue(mockAgreement);

    const result = await saveAgreementAction.execute(mockAgreement);

    expect(preFilterAgreementRepositoryMockInstance.save).toHaveBeenCalledWith(mockAgreement);
    expect(result).toEqual(mockAgreement);
  });

  it('should handle errors when saving an agreement', async () => {
    const error = new Error('Failed to save agreement');
    preFilterAgreementRepositoryMockInstance.save.mockRejectedValue(error);

    await expect(saveAgreementAction.execute(mockAgreement)).rejects.toThrow(error);
    expect(preFilterAgreementRepositoryMockInstance.save).toHaveBeenCalledWith(mockAgreement);
  });
});
