import { SaveTypeOfAgreementAction, ISaveTypeOfAgreementAction } from "../../../../../../src/modules/parameters/preFilterTypesOfAgreements/core/actions/SaveTypeOfAgreementAction";
import { IPreFilterTypesOfAgreementRepository } from "../../../../../../src/modules/parameters/preFilterTypesOfAgreements/core/repository/IPreFilterTypesOfAgreementsRepository";
import { preFilterTypesOfAgreementsRepositoryMock, mockPreFilterType } from "../../mocks";

describe("SaveTypeOfAgreementAction", () => {
    let mockPreFilterTypeOfAgreementRepository: jest.Mocked<IPreFilterTypesOfAgreementRepository>;
    let saveTypeOfAgtreementAction: ISaveTypeOfAgreementAction;

    beforeEach(() => {
        mockPreFilterTypeOfAgreementRepository = preFilterTypesOfAgreementsRepositoryMock();
        saveTypeOfAgtreementAction = SaveTypeOfAgreementAction(mockPreFilterTypeOfAgreementRepository);
    });

    it("should successfully save a type of agreement and return the result", async () => {
        mockPreFilterTypeOfAgreementRepository.save.mockResolvedValue(mockPreFilterType);

        const result = await saveTypeOfAgtreementAction.execute(mockPreFilterType);

        expect(mockPreFilterTypeOfAgreementRepository.save).toHaveBeenCalledWith(mockPreFilterType);
        expect(result).toEqual(mockPreFilterType);
    });

    it("should reject with an error if saving fails", async () => {
        const mockError = new Error("Failed to save");

        mockPreFilterTypeOfAgreementRepository.save.mockRejectedValue(mockError);

        await expect(saveTypeOfAgtreementAction.execute(mockPreFilterType)).rejects.toThrow("Failed to save");
        expect(mockPreFilterTypeOfAgreementRepository.save).toHaveBeenCalledWith(mockPreFilterType);
    });
});
