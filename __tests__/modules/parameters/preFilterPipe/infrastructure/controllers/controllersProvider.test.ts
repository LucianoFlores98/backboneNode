import { getPreFilterControllers } from "../../../../../../src/modules/parameters/preFilterPipe/infrastructure/controllers/controllersProvider";
import { DependencyManager } from ",../../../src/dependencyManager";
import { createMockPreFilterPipeRepository, createMockPreFilterPipeActions } from "../../mocks";
import { IPreFilterPipeRepository } from "../../../../../../src/modules/parameters/preFilterPipe/core/repository/IPreFilterPipeRepository";
import { PreFilterControllers } from "../../../../../../src/modules/parameters/preFilterPipe/infrastructure/controllers/PreFilterPipeControllers";
import { getPipeActions } from "../../../../../../src/modules/parameters/preFilterPipe/core/actions/actionsProvider";

jest.mock("../../../../../../src/modules/parameters/preFilterPipe/core/actions/actionsProvider");
jest.mock("../../../../../../src/modules/parameters/preFilterPipe/infrastructure/controllers/PreFilterPipeControllers");

describe("controllersProvider", () => {
  let dependencyManager: jest.Mocked<DependencyManager>;
  let mockRepository: jest.Mocked<IPreFilterPipeRepository>;
  let mockActions: ReturnType<typeof createMockPreFilterPipeActions>;

  beforeEach(() => {
    dependencyManager = { resolve: jest.fn() } as any;
    mockRepository = createMockPreFilterPipeRepository();
    mockActions = createMockPreFilterPipeActions();

    dependencyManager.resolve.mockReturnValue(mockRepository);

    (getPipeActions as jest.Mock).mockReturnValue(mockActions);
    (PreFilterControllers as jest.Mock).mockImplementation(() => jest.fn());
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should resolve and return the PreFilterControllers with the correct dependencies", () => {
    const controllers = getPreFilterControllers(dependencyManager);

    expect(dependencyManager.resolve).toHaveBeenCalledWith("preFilterPipeRepository");
    expect(getPipeActions).toHaveBeenCalledWith(mockRepository);

    expect(PreFilterControllers).toHaveBeenCalledWith(mockActions);
    expect(controllers).toEqual(expect.any(Function));
  });
});
