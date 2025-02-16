import { EditPipeAction } from "../../../../../../src/modules/parameters/preFilterPipe/core/actions/EditPipeAction";
import {
  createMockPreFilterPipeRepository,
  mockPipe,
} from "../../../../../../__tests__/modules/parameters/preFilterPipe/mocks";

describe("EditPipeAction", () => {
  let mockPreFilterPipeRepository: ReturnType<
    typeof createMockPreFilterPipeRepository
  >;

  beforeEach(() => {
    mockPreFilterPipeRepository = createMockPreFilterPipeRepository();
  });

  it("should call PreFilterPipeRepository.getById with the correct ID", async () => {
    const action = EditPipeAction(mockPreFilterPipeRepository);
    const pipeId = "1";
    mockPreFilterPipeRepository.getById.mockResolvedValue(mockPipe);

    await action.execute(mockPipe, pipeId);

    expect(mockPreFilterPipeRepository.getById).toHaveBeenCalledWith(pipeId);
  });

  it("should throw PipeNotExistException if the pipe does not exist", async () => {
    const action = EditPipeAction(mockPreFilterPipeRepository);
    const pipeId = "non-existent-id";
    mockPreFilterPipeRepository.getById.mockResolvedValue(null);

    await expect(action.execute(mockPipe, pipeId)).rejects.toThrow(
      "Pipe inexistente"
    );
  });

  it("should call PreFilterPipeRepository.edit with correct parameters if pipe exists", async () => {
    const action = EditPipeAction(mockPreFilterPipeRepository);
    const pipeId = "1";
    mockPreFilterPipeRepository.getById.mockResolvedValue(mockPipe);

    await action.execute(mockPipe, pipeId);

    expect(mockPreFilterPipeRepository.edit).toHaveBeenCalledWith(
      mockPipe,
      pipeId
    );
  });

  it("should return the updated pipe after successful edit", async () => {
    const action = EditPipeAction(mockPreFilterPipeRepository);
    const pipeId = "1";
    const updatedPipe = { ...mockPipe, value: "updated-value" };
    mockPreFilterPipeRepository.getById
      .mockResolvedValueOnce(mockPipe)
      .mockResolvedValueOnce(updatedPipe);

    const result = await action.execute(updatedPipe, pipeId);

    expect(result).toEqual(updatedPipe);
  });

  it("should reject with an error if PreFilterPipeRepository.edit throws an error", async () => {
    const action = EditPipeAction(mockPreFilterPipeRepository);
    const pipeId = "1";
    const mockError = new Error("Edit failed");
    mockPreFilterPipeRepository.getById.mockResolvedValue(mockPipe);
    mockPreFilterPipeRepository.edit.mockRejectedValue(mockError);

    await expect(action.execute(mockPipe, pipeId)).rejects.toThrow(mockError);
  });
});
