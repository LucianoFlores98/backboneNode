import {getPreFilterAgeControllers} from "../../../../../../src/modules/parameters/preFilterAge/infrastructure/controllers/controllersProvider";
import {DependencyManager} from "../../../../../../src/dependencyManager";
import {preFilterAgeRepositoryMock, createMockPreFilterAgeActions} from "../../mocks";
import { IPreFilterAgeRepository } from "../../../../../../src/modules/parameters/preFilterAge/core/repository/IPreFilterAgeRepository";
import {PreFilterAgeControllers} from "../../../../../../src/modules/parameters/preFilterAge/infrastructure/controllers/PreFilterAgeControllers";
import {getAgeActions} from "../../../../../../src/modules/parameters/preFilterAge/core/actions/actionsProvider";

jest.mock("../../../../../../src/modules/parameters/preFilterAge/core/actions/actionsProvider");
jest.mock("../../../../../../src/modules/parameters/preFilterAge/infrastructure/controllers/PreFilterAgeControllers");

describe("controllersProvider", () => {
    let dependencyManager: jest.Mocked<DependencyManager>;
    let mockRepository: jest.Mocked<IPreFilterAgeRepository>;
    let mockActions: ReturnType<typeof createMockPreFilterAgeActions>;
  
    beforeEach(() => {
      dependencyManager = { resolve: jest.fn() } as any;
      mockRepository = preFilterAgeRepositoryMock();
      mockActions = createMockPreFilterAgeActions();
  
      dependencyManager.resolve.mockReturnValue(mockRepository);
  
      (getAgeActions as jest.Mock).mockReturnValue(mockActions);
      (PreFilterAgeControllers as jest.Mock).mockImplementation(() => jest.fn());
    });
  
    afterEach(() => {
      jest.clearAllMocks();
    });
  
    it("should resolve and return the PreFilterControllers with the correct dependencies", () => {
      const controllers = getPreFilterAgeControllers(dependencyManager);
  
      expect(dependencyManager.resolve).toHaveBeenCalledWith("preFilterAgeRepository");
      expect(getAgeActions).toHaveBeenCalledWith(mockRepository);
  
      expect(PreFilterAgeControllers).toHaveBeenCalledWith(mockActions);
      expect(controllers).toEqual(expect.any(Function));
    });
  });

