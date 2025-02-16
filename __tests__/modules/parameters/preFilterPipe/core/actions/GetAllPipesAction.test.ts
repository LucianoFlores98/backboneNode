import { GetAllPipesAction } from "../../../../../../src/modules/parameters/preFilterPipe/core/actions/GetAllPipesAction";
import { createMockPreFilterPipeRepository, mockPipe } from "../../../../../../__tests__/modules/parameters/preFilterPipe/mocks";

describe("GetAllPipesAction", () => {
  let mockPreFilterPipeRepository: ReturnType<typeof createMockPreFilterPipeRepository>;

  beforeEach(() => {
    mockPreFilterPipeRepository = createMockPreFilterPipeRepository();
  });

  it("should call PreFilterPipeRepository.getAll with the provided query", async () => {
    const action = GetAllPipesAction(mockPreFilterPipeRepository);
    const query = { key: "test-key" };
    mockPreFilterPipeRepository.getAll.mockResolvedValue([mockPipe]);

    await action.execute(query);

    expect(mockPreFilterPipeRepository.getAll).toHaveBeenCalledWith(query);
    expect(mockPreFilterPipeRepository.getAll).toHaveBeenCalledTimes(1);
  });

  it("should resolve with the result from PreFilterPipeRepository.getAll", async () => {
    const action = GetAllPipesAction(mockPreFilterPipeRepository);
    const query = { key: "test-key" };
    const expectedPipes = [mockPipe, { ...mockPipe, id: "2" }];
    mockPreFilterPipeRepository.getAll.mockResolvedValue(expectedPipes);

    const result = await action.execute(query);

    expect(result).toEqual(expectedPipes);
  });

  it("should reject if PreFilterPipeRepository.getAll throws an error", async () => {
    const action = GetAllPipesAction(mockPreFilterPipeRepository);
    const query = { key: "test-key" };
    const mockError = new Error("GetAll failed");
    mockPreFilterPipeRepository.getAll.mockRejectedValue(mockError);

    await expect(action.execute(query)).rejects.toThrow(mockError);
  });
});
