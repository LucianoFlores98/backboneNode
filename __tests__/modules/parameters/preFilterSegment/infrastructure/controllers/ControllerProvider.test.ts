import {getPreFilterSegmentControllers} from "../../../../../../src/modules/parameters/preFilterSegment/infrastructure/controllers/controllersProvider";
import {DependencyManager} from "../../../../../../src/dependencyManager";
import {preFilterSegmentRepositoryMock, createMockPreFilterSegmentActions} from "../../mocks";
import { IPreFilterSegmentRepository } from "../../../../../../src/modules/parameters/preFilterSegment/core/repository/IPreFilterSegmentRepository";
import {PreFilterSegmentControllers} from "../../../../../../src/modules/parameters/preFilterSegment/infrastructure/controllers/PreFilterSegmentControllers";
import {getSegmentActions} from "../../../../../../src/modules/parameters/preFilterSegment/core/actions/actionsProvider";

jest.mock("../../../../../../src/modules/parameters/preFilterSegment/core/actions/actionsProvider");
jest.mock("../../../../../../src/modules/parameters/preFilterSegment/infrastructure/controllers/PreFilterSegmentControllers");

describe("controllersProvider", () => {
    let dependencyManager: jest.Mocked<DependencyManager>;
    let mockRepository: jest.Mocked<IPreFilterSegmentRepository>;
    let mockActions: ReturnType<typeof createMockPreFilterSegmentActions>;
  
    beforeEach(() => {
      dependencyManager = { resolve: jest.fn() } as any;
      mockRepository = preFilterSegmentRepositoryMock();
      mockActions = createMockPreFilterSegmentActions();
  
      dependencyManager.resolve.mockReturnValue(mockRepository);
  
      (getSegmentActions as jest.Mock).mockReturnValue(mockActions);
      (PreFilterSegmentControllers as jest.Mock).mockImplementation(() => jest.fn());
    });
  
    afterEach(() => {
      jest.clearAllMocks();
    });
  
    it("should resolve and return the PreFilterControllers with the correct dependencies", () => {
      const controllers = getPreFilterSegmentControllers(dependencyManager);
  
      expect(dependencyManager.resolve).toHaveBeenCalledWith("preFilterSegmentRepository");
      expect(getSegmentActions).toHaveBeenCalledWith(mockRepository);
  
      expect(PreFilterSegmentControllers).toHaveBeenCalledWith(mockActions);
      expect(controllers).toEqual(expect.any(Function));
    });
  });

