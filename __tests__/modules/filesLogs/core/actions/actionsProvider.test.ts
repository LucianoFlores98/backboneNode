import { getFileActions} from "../../../../../src/modules/filesLogs/core/actions/actionsProvider";
import { fileRepository, fileUploadService, httpClientService } from "../../mocks";

describe("actionsProvider", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return all actions with the repository injected", () => {
    const actions = getFileActions(fileRepository, fileUploadService, httpClientService);

    expect(actions).toHaveProperty("save");
  });
});
