import { getRucControllers } from "../../../../../src/modules/ruc/infrastructure/controllers/controllersProvider";
import { DependencyManager } from "../../../../../src/dependencyManager";
import { rucRepositoryMock, createMockRucActions } from "../../mocks";
import { IRucRepository } from "../../../../../src/modules/ruc/core/repository/IRucRepository";
import { RucControllers } from "../../../../../src/modules/ruc/infrastructure/controllers/RucControllers";
import { getRucActions } from "../../../../../src/modules/ruc/core/actions/actionsProvider";

jest.mock("../../../../../src/modules/ruc/core/actions/actionsProvider");
jest.mock("../../../../../src/modules/ruc/infrastructure/controllers/RucControllers");

describe("controllersProvider", () => {
    let dependencyManager: jest.Mocked<DependencyManager>;
    let mockRepository: jest.Mocked<IRucRepository>;
    let mockActions: ReturnType<typeof createMockRucActions>;

    beforeEach(() => {
        jest.clearAllMocks();
        dependencyManager = { resolve: jest.fn() } as any;
        mockRepository = rucRepositoryMock();
        mockActions = createMockRucActions();

        dependencyManager.resolve.mockReturnValue(mockRepository);

        (getRucActions as jest.Mock).mockReturnValue(mockActions);
        (RucControllers as jest.Mock).mockImplementation(() => jest.fn());
    });

    it("should resolve and return the RucControllers with the correct dependencies", () => {
        const controllers = getRucControllers(dependencyManager);

        expect(dependencyManager.resolve).toHaveBeenCalledWith("rucRepository");
        expect(getRucActions).toHaveBeenCalledWith(mockRepository);

        expect(RucControllers).toHaveBeenCalledWith(mockActions);
        expect(controllers).toEqual(expect.any(Function));
    });
});

