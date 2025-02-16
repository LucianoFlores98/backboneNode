import { GetAllTypesOfAgreementsAction, IGetAllTypesOfAgreementsAction } from "../../../../../../src/modules/parameters/preFilterTypesOfAgreements/core/actions/GetAllTypesOfAgreementsAction";
import { IPreFilterTypesOfAgreementRepository } from "../../../../../../src/modules/parameters/preFilterTypesOfAgreements/core/repository/IPreFilterTypesOfAgreementsRepository";
import { preFilterTypesOfAgreementsRepositoryMock, mockPreFilterType } from "../../mocks";

describe("GetAllTypesOfAgreementsAction", () => {
  let getAllTypesOfAgreementsAction: IGetAllTypesOfAgreementsAction;
  let preFilterTypeOfAgreementRepository: jest.Mocked<IPreFilterTypesOfAgreementRepository>;

  beforeEach(() => {
    preFilterTypeOfAgreementRepository = preFilterTypesOfAgreementsRepositoryMock();
    getAllTypesOfAgreementsAction = GetAllTypesOfAgreementsAction(preFilterTypeOfAgreementRepository);
  });

  it("should return an array of types of agreements when execute is called", async () => {
    const query = {};
    preFilterTypeOfAgreementRepository.getAll.mockResolvedValue([mockPreFilterType]);

    const result = await getAllTypesOfAgreementsAction.execute(query);

    expect(result).toEqual([mockPreFilterType]);
    expect(preFilterTypeOfAgreementRepository.getAll).toHaveBeenCalledWith(query);
    expect(preFilterTypeOfAgreementRepository.getAll).toHaveBeenCalledTimes(1);
  });

  it("should handle errors when execute is called", async () => {
    const query = {};
    const error = new Error("Database error");
    preFilterTypeOfAgreementRepository.getAll.mockRejectedValue(error);

    await expect(getAllTypesOfAgreementsAction.execute(query)).rejects.toThrow("Database error");
    expect(preFilterTypeOfAgreementRepository.getAll).toHaveBeenCalledWith(query);
    expect(preFilterTypeOfAgreementRepository.getAll).toHaveBeenCalledTimes(1);
  });
});
