import { GetPipeByIdAction } from "../../../../../../src/modules/parameters/preFilterPipe/core/actions/GetPipeByIdAction";
import { createMockPreFilterPipeRepository, mockPipe } from "../../../../../../__tests__/modules/parameters/preFilterPipe/mocks";

describe("GetPipeByIdAction", () => {
  let mockPreFilterPipeRepository: ReturnType<typeof createMockPreFilterPipeRepository>;

  beforeEach(() => {
    mockPreFilterPipeRepository = createMockPreFilterPipeRepository();
  });

  it("should call PreFilterPipeRepository.getById with the correct ID", async () => {
    const action = GetPipeByIdAction(mockPreFilterPipeRepository);
    const pipeId = "1";
    mockPreFilterPipeRepository.getById.mockResolvedValue(mockPipe);

    await action.execute(pipeId);

    expect(mockPreFilterPipeRepository.getById).toHaveBeenCalledWith(pipeId);
    expect(mockPreFilterPipeRepository.getById).toHaveBeenCalledTimes(1);
  });

  it("should throw PipeNotExistException if no pipe is found", async () => {
    const action = GetPipeByIdAction(mockPreFilterPipeRepository);
    const pipeId = "non-existent-id";
    mockPreFilterPipeRepository.getById.mockResolvedValue(null);

    await expect(action.execute(pipeId)).rejects.toThrow("Pipe inexistente");
  });

  it("should resolve with the pipe if it is found", async () => {
    const action = GetPipeByIdAction(mockPreFilterPipeRepository);
    const pipeId = "1";
    mockPreFilterPipeRepository.getById.mockResolvedValue(mockPipe);

    const result = await action.execute(pipeId);

    expect(result).toEqual(mockPipe);
  });

  it("should reject with an error if PreFilterPipeRepository.getById throws an error", async () => {
    const action = GetPipeByIdAction(mockPreFilterPipeRepository);
    const pipeId = "1";
    const mockError = new Error("GetById failed");
    mockPreFilterPipeRepository.getById.mockRejectedValue(mockError);

    await expect(action.execute(pipeId)).rejects.toThrow(mockError);
  });
});
