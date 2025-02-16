import { getPipeActions } from "../../../../../../src/modules/parameters/preFilterPipe/core/actions/actionsProvider";
import { createMockPreFilterPipeRepository } from "../../../../../../__tests__/modules/parameters/preFilterPipe/mocks";

describe("actionsProvider", () => {
  let mockPreFilterPipeRepository = createMockPreFilterPipeRepository();

  beforeEach(() => {
    mockPreFilterPipeRepository = createMockPreFilterPipeRepository();
  });

  it("should return all actions with the repository injected", () => {
    const actions = getPipeActions(mockPreFilterPipeRepository);

    expect(actions).toHaveProperty("save");
    expect(actions).toHaveProperty("edit");
    expect(actions).toHaveProperty("getAll");
    expect(actions).toHaveProperty("getById");
    expect(actions).toHaveProperty("remove");
  });
});
