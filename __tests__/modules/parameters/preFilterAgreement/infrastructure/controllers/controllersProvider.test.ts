import { getPreFilterAgreementControllers } from "../../../../../../src/modules/parameters/preFilterAgreement/infrastructure/controllers/controllersProvider";
import { DependencyManager } from "../../../../../../src/dependencyManager";
import {
  preFilterAgreementRepositoryMock,
  createMockPreFilterAgreementActions,
} from "../../mocks";
import { IPreFilterAgreementRepository } from "../../../../../../src/modules/parameters/preFilterAgreement/core/repository/IPreFilterAgreementRepository";
import { PreFilterAgreementControllers } from "../../../../../../src/modules/parameters/preFilterAgreement/infrastructure/controllers/PreFilterAgreementControllers";
import { getAgreementActions } from "../../../../../../src/modules/parameters/preFilterAgreement/core/actions/actionsProvider";

jest.mock(
  "../../../../../../src/modules/parameters/preFilterAgreement/core/actions/actionsProvider"
);
jest.mock(
  "../../../../../../src/modules/parameters/preFilterAgreement/infrastructure/controllers/PreFilterAgreementControllers"
);

describe("controllersProvider", () => {
  let dependencyManager: jest.Mocked<DependencyManager>;
  let mockRepository: jest.Mocked<IPreFilterAgreementRepository>;
  let mockActions: ReturnType<typeof createMockPreFilterAgreementActions>;

  beforeEach(() => {
    dependencyManager = { resolve: jest.fn() } as any;
    mockRepository = preFilterAgreementRepositoryMock();
    mockActions = createMockPreFilterAgreementActions();

    dependencyManager.resolve.mockReturnValue(mockRepository);

    (getAgreementActions as jest.Mock).mockReturnValue(mockActions);
    (PreFilterAgreementControllers as jest.Mock).mockImplementation(() =>
      jest.fn()
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should resolve and return the PreFilterControllers with the correct dependencies", () => {
    const controllers = getPreFilterAgreementControllers(dependencyManager);

    expect(dependencyManager.resolve).toHaveBeenCalledWith(
      "preFilterAgreementRepository"
    );
    expect(getAgreementActions).toHaveBeenCalledWith(mockRepository);

    expect(PreFilterAgreementControllers).toHaveBeenCalledWith(mockActions);
    expect(controllers).toEqual(expect.any(Function));
  });
});
