import { SavePipeAction } from "../../../../../../src/modules/parameters/preFilterPipe/core/actions/SavePipeAction";
import { createMockPreFilterPipeRepository, mockPipe } from "../../mocks";

describe("SavePipeAction", () => {
  let mockPreFilterPipeRepository: ReturnType<typeof createMockPreFilterPipeRepository>;

  beforeEach(() => {
    mockPreFilterPipeRepository = createMockPreFilterPipeRepository();
  });

  it("should call PreFilterPipeRepository.save with the correct parameters", async () => {
    const action = SavePipeAction(mockPreFilterPipeRepository);
    mockPreFilterPipeRepository.save.mockResolvedValue(mockPipe);

    await action.execute(mockPipe);

    expect(mockPreFilterPipeRepository.save).toHaveBeenCalledWith(mockPipe);
    expect(mockPreFilterPipeRepository.save).toHaveBeenCalledTimes(1);
  });

  it("should resolve with the result of PreFilterPipeRepository.save", async () => {
    const action = SavePipeAction(mockPreFilterPipeRepository);
    mockPreFilterPipeRepository.save.mockResolvedValue(mockPipe);

    const result = await action.execute(mockPipe);

    expect(result).toEqual(mockPipe);
  });

  it("should reject when PreFilterPipeRepository.save throws an error", async () => {
    const action = SavePipeAction(mockPreFilterPipeRepository);
    const mockError = new Error("Save failed");
    mockPreFilterPipeRepository.save.mockRejectedValue(mockError);

    await expect(action.execute(mockPipe)).rejects.toThrow(mockError);
  });
});