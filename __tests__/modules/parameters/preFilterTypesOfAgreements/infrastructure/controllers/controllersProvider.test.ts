import { getPreFilterTypeOfAgreementControllers } from "../../../../../../src/modules/parameters/preFilterTypesOfAgreements/infrastructure/controllers/controllersProvider";
import { DependencyManager } from "../../../../../../src/dependencyManager";
import { IPreFilterTypesOfAgreementRepository } from "../../../../../../src/modules/parameters/preFilterTypesOfAgreements/core/repository/IPreFilterTypesOfAgreementsRepository";
import { PreFilterTypeOfAgreementsControllers } from "../../../../../../src/modules/parameters/preFilterTypesOfAgreements/infrastructure/controllers/PreFilterTypesOfAgreementsControllers";
import { getPreFilterTypeOfAgreementActions } from "../../../../../../src/modules/parameters/preFilterTypesOfAgreements/core/actions/actionsProvider";
import { preFilterTypesOfAgreementsRepositoryMock, createMockPreFilterTypeOfAgreementActions } from "../../mocks";

jest.mock("../../../../../../src/modules/parameters/preFilterTypesOfAgreements/core/actions/actionsProvider");
jest.mock("../../../../../../src/modules/parameters/preFilterTypesOfAgreements/infrastructure/controllers/PreFilterTypesOfAgreementsControllers");

describe("controllersProvider", () => {
    let dependencyManager: jest.Mocked<DependencyManager>;
    let mockRepository: jest.Mocked<IPreFilterTypesOfAgreementRepository>;
    let mockActions: ReturnType<typeof createMockPreFilterTypeOfAgreementActions>;

    beforeEach(() => {
        dependencyManager = { resolve: jest.fn() } as any;
        mockRepository = preFilterTypesOfAgreementsRepositoryMock();
        mockActions = createMockPreFilterTypeOfAgreementActions();

        dependencyManager.resolve.mockReturnValue(mockRepository);

        (getPreFilterTypeOfAgreementActions as jest.Mock).mockReturnValue(mockActions);
        (PreFilterTypeOfAgreementsControllers as jest.Mock).mockImplementation(() => jest.fn());
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should resolve and return the PreFilterTypesOfAgreements controllers with the correct dependencies", () => {
        const controllers = getPreFilterTypeOfAgreementControllers(dependencyManager);

        expect(dependencyManager.resolve).toHaveBeenCalledWith("preFilterTypeOfAgreementRepository");
        expect(getPreFilterTypeOfAgreementActions).toHaveBeenCalledWith(mockRepository);

        expect(PreFilterTypeOfAgreementsControllers).toHaveBeenCalledWith(mockActions);
        expect(controllers).toEqual(expect.any(Function));
    });
});

