import { getPreFilterTypeOfAgreementActions } from "../../../../../../src/modules/parameters/preFilterTypesOfAgreements/core/actions/actionsProvider";
import { preFilterTypesOfAgreementsRepositoryMock } from "../../mocks";

describe("actionsProvider", () => {
    let mockPreFilterTypeOfAgreementRepository = preFilterTypesOfAgreementsRepositoryMock();

    beforeEach(() => {
        mockPreFilterTypeOfAgreementRepository = preFilterTypesOfAgreementsRepositoryMock();
    });

    it("should return all actions with the repository injected", () => {
        const actions = getPreFilterTypeOfAgreementActions(mockPreFilterTypeOfAgreementRepository);

        expect(actions).toHaveProperty("save");
        expect(actions).toHaveProperty("edit");
        expect(actions).toHaveProperty("getAll");
        expect(actions).toHaveProperty("getById");
        expect(actions).toHaveProperty("remove");
    });
});
