import { RemoveTypeOfAgreementAction, IRemoveTypeOfAgreementAction } from "../../../../../../src/modules/parameters/preFilterTypesOfAgreements/core/actions/RemoveTypeOfAgreementAction";
import { IPreFilterTypesOfAgreementRepository } from "../../../../../../src/modules/parameters/preFilterTypesOfAgreements/core/repository/IPreFilterTypesOfAgreementsRepository";
import { preFilterTypesOfAgreementsRepositoryMock, mockPreFilterType } from "../../mocks";

describe("RemoveTypeOfAgreementAction", () => {
    let removeTypeOfAgreementAction: IRemoveTypeOfAgreementAction;
    let preFilterTypeOfAgreementRepository: jest.Mocked<IPreFilterTypesOfAgreementRepository>;

    beforeEach(() => {
        preFilterTypeOfAgreementRepository = preFilterTypesOfAgreementsRepositoryMock();
        removeTypeOfAgreementAction = RemoveTypeOfAgreementAction(preFilterTypeOfAgreementRepository);
    });

    it("should return the type of agreement object when execute is called with a valid ID and removes it", async () => {
        const id = "1";
        preFilterTypeOfAgreementRepository.getById.mockResolvedValue(mockPreFilterType);
        preFilterTypeOfAgreementRepository.remove.mockResolvedValue(mockPreFilterType);

        const result = await removeTypeOfAgreementAction.execute(id);

        expect(result).toEqual(mockPreFilterType);
        expect(preFilterTypeOfAgreementRepository.getById).toHaveBeenCalledWith(id);
        expect(preFilterTypeOfAgreementRepository.getById).toHaveBeenCalledTimes(1);
        expect(preFilterTypeOfAgreementRepository.remove).toHaveBeenCalledWith(id);
        expect(preFilterTypeOfAgreementRepository.remove).toHaveBeenCalledTimes(1);
    });

    it("should throw TypeOfAgreementNotExistException when no type is found for the given ID", async () => {
        const id = "non-existent-id";
        preFilterTypeOfAgreementRepository.getById.mockResolvedValue(null);

        await expect(removeTypeOfAgreementAction.execute(id)).rejects.toThrow("Tipo de convenio inexistente");
        expect(preFilterTypeOfAgreementRepository.getById).toHaveBeenCalledWith(id);
        expect(preFilterTypeOfAgreementRepository.getById).toHaveBeenCalledTimes(1);
        expect(preFilterTypeOfAgreementRepository.remove).not.toHaveBeenCalled();
    });

    it("should handle errors thrown by the repository when executing remove", async () => {
        const id = "1";
        const error = new Error("Database error");
        preFilterTypeOfAgreementRepository.getById.mockResolvedValue(mockPreFilterType);
        preFilterTypeOfAgreementRepository.remove.mockRejectedValue(error);

        await expect(removeTypeOfAgreementAction.execute(id)).rejects.toThrow("Database error");
        expect(preFilterTypeOfAgreementRepository.getById).toHaveBeenCalledWith(id);
        expect(preFilterTypeOfAgreementRepository.getById).toHaveBeenCalledTimes(1);
        expect(preFilterTypeOfAgreementRepository.remove).toHaveBeenCalledWith(id);
        expect(preFilterTypeOfAgreementRepository.remove).toHaveBeenCalledTimes(1);
    });
});
