import { getAgeActions } from "../../../../../../src/modules/parameters/preFilterAge/core/actions/actionsProvider";
import { preFilterAgeRepositoryMock } from "../../mocks";

describe("actionsProvider", () => {
  let mockPreFilterAgeRepository = preFilterAgeRepositoryMock();

  beforeEach(() => {
    mockPreFilterAgeRepository = preFilterAgeRepositoryMock();
  });

  it("should return all actions with the repository injected", () => {
    const actions = getAgeActions(mockPreFilterAgeRepository);

    expect(actions).toHaveProperty("save");
    expect(actions).toHaveProperty("edit");
    expect(actions).toHaveProperty("getAll");
    expect(actions).toHaveProperty("getById");
    expect(actions).toHaveProperty("remove");
  });
});
