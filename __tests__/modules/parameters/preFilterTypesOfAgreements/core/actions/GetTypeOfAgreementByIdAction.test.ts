import { GetTypeOfAgreementByIdAction, IGetTypeOfAgreementByIdAction } from "../../../../../../src/modules/parameters/preFilterTypesOfAgreements/core/actions/GetTypeOfAgreementByIdAction";
import { IPreFilterTypesOfAgreementRepository } from "../../../../../../src/modules/parameters/preFilterTypesOfAgreements/core/repository/IPreFilterTypesOfAgreementsRepository";
import { preFilterTypesOfAgreementsRepositoryMock, mockPreFilterType } from "../../mocks";

describe("GetTypeOfAgreementByIdAction", () => {
    let getTypeOfAgreementByIdAction: IGetTypeOfAgreementByIdAction;
    let preFilterTypeOfAgreementRepository: jest.Mocked<IPreFilterTypesOfAgreementRepository>;

    beforeEach(() => {
        preFilterTypeOfAgreementRepository = preFilterTypesOfAgreementsRepositoryMock();
        getTypeOfAgreementByIdAction = GetTypeOfAgreementByIdAction(preFilterTypeOfAgreementRepository);
    });

    it("should return a type of agreement object when execute is called with a valid ID", async () => {
        const id = "1";
        preFilterTypeOfAgreementRepository.getById.mockResolvedValue(mockPreFilterType);

        const result = await getTypeOfAgreementByIdAction.execute(id);

        expect(result).toEqual(mockPreFilterType);
        expect(preFilterTypeOfAgreementRepository.getById).toHaveBeenCalledWith(id);
        expect(preFilterTypeOfAgreementRepository.getById).toHaveBeenCalledTimes(1);
    });

    it("should throw TypeOfAgreementNotExist exception when no type is found for the given ID", async () => {
        const id = "non-existent-id";
        preFilterTypeOfAgreementRepository.getById.mockResolvedValue(null);

        await expect(getTypeOfAgreementByIdAction.execute(id)).rejects.toThrow("Tipo de convenio inexistente"); expect(preFilterTypeOfAgreementRepository.getById).toHaveBeenCalledWith(id);
        expect(preFilterTypeOfAgreementRepository.getById).toHaveBeenCalledTimes(1);
    });

    it("should handle errors when execute is called with an invalid ID", async () => {
        const id = "invalid-id";
        const error = new Error("Database error");
        preFilterTypeOfAgreementRepository.getById.mockRejectedValue(error);

        await expect(getTypeOfAgreementByIdAction.execute(id)).rejects.toThrow("Database error");
        expect(preFilterTypeOfAgreementRepository.getById).toHaveBeenCalledWith(id);
        expect(preFilterTypeOfAgreementRepository.getById).toHaveBeenCalledTimes(1);
    });
});
