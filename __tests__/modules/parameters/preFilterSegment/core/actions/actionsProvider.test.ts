import { getSegmentActions } from "../../../../../../src/modules/parameters/preFilterSegment/core/actions/actionsProvider";
import { preFilterSegmentRepositoryMock } from "../../mocks";

describe("actionsProvider", () => {
  let mockPreFilterSegmentRepository = preFilterSegmentRepositoryMock();

  beforeEach(() => {
    mockPreFilterSegmentRepository = preFilterSegmentRepositoryMock();
  });

  it("should return all actions with the repository injected", () => {
    const actions = getSegmentActions(mockPreFilterSegmentRepository);

    expect(actions).toHaveProperty("save");
    expect(actions).toHaveProperty("edit");
    expect(actions).toHaveProperty("getAll");
    expect(actions).toHaveProperty("getById");
    expect(actions).toHaveProperty("remove");
  });
});
