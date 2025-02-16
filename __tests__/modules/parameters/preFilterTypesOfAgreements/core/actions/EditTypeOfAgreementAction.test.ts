import { EditTypeOfAgreementAction } from "../../../../../../src/modules/parameters/preFilterTypesOfAgreements/core/actions/EditTypeOfAgreementAction";
import { preFilterTypesOfAgreementsRepositoryMock, mockPreFilterType } from "../../mocks";

describe("EditTypeOfAgreementAction", () => {
    let mockPreFilterTypeOfAgreementRepository: ReturnType<typeof preFilterTypesOfAgreementsRepositoryMock>;
    let editTypeOfAgreementAction: ReturnType<typeof EditTypeOfAgreementAction>;

    beforeEach(() => {
        mockPreFilterTypeOfAgreementRepository = preFilterTypesOfAgreementsRepositoryMock();
        editTypeOfAgreementAction = EditTypeOfAgreementAction(mockPreFilterTypeOfAgreementRepository);
    });

    it("should successfully edit a type of agreement and return the result", async () => {
        const updatedmockPreFilterType = { ...mockPreFilterType, value: "35" };

        mockPreFilterTypeOfAgreementRepository.getById.mockResolvedValueOnce(mockPreFilterType);
        mockPreFilterTypeOfAgreementRepository.edit.mockResolvedValueOnce(updatedmockPreFilterType);
        mockPreFilterTypeOfAgreementRepository.getById.mockResolvedValueOnce(updatedmockPreFilterType);

        const result = await editTypeOfAgreementAction.execute(updatedmockPreFilterType, updatedmockPreFilterType.id);

        expect(mockPreFilterTypeOfAgreementRepository.getById).toHaveBeenCalledWith(updatedmockPreFilterType.id);
        expect(mockPreFilterTypeOfAgreementRepository.edit).toHaveBeenCalledWith(updatedmockPreFilterType, updatedmockPreFilterType.id);
        expect(result).toEqual(updatedmockPreFilterType);
    });

    it("should throw TypeOfAgreementNotExist exception if type does not exist", async () => {
        const nonExistentId = "999";

        mockPreFilterTypeOfAgreementRepository.getById.mockResolvedValueOnce(null);

        await expect(editTypeOfAgreementAction.execute(mockPreFilterType, nonExistentId)).rejects.toThrow("Tipo de convenio inexistente");
        expect(mockPreFilterTypeOfAgreementRepository.getById).toHaveBeenCalledWith(nonExistentId);
        expect(mockPreFilterTypeOfAgreementRepository.edit).toHaveBeenCalled();
    });

    it("should reject with an error if repository operations fail", async () => {
        const mockError = new Error("Failed to edit");

        mockPreFilterTypeOfAgreementRepository.getById.mockResolvedValueOnce(mockPreFilterType);
        mockPreFilterTypeOfAgreementRepository.edit.mockRejectedValueOnce(mockError);

        await expect(editTypeOfAgreementAction.execute(mockPreFilterType, mockPreFilterType.id)).rejects.toThrow("Failed to edit");
        expect(mockPreFilterTypeOfAgreementRepository.getById).toHaveBeenCalledWith(mockPreFilterType.id);
        expect(mockPreFilterTypeOfAgreementRepository.edit).toHaveBeenCalledWith(mockPreFilterType, mockPreFilterType.id);
    });
});
