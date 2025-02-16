import { SaveSegmentAction } from "../../../../../../src/modules/parameters/preFilterSegment/core/actions/SaveSegmentAction";
import { IPreFilterSegmentRepository } from "../../../../../../src/modules/parameters/preFilterSegment/core/repository/IPreFilterSegmentRepository";
import { preFilterSegmentRepositoryMock, mockSegment } from "../../mocks";

describe("SaveSegmentAction", () => {
  let mockPreFilterSegmentRepository: jest.Mocked<IPreFilterSegmentRepository>;
  let saveSegmentAction: ReturnType<typeof SaveSegmentAction>;

  beforeEach(() => {
    mockPreFilterSegmentRepository = preFilterSegmentRepositoryMock();
    saveSegmentAction = SaveSegmentAction(mockPreFilterSegmentRepository);
  });

  it("should successfully save an Segment and return the result", async () => {
    mockPreFilterSegmentRepository.save.mockResolvedValue(mockSegment);

    const result = await saveSegmentAction.execute(mockSegment);

    expect(mockPreFilterSegmentRepository.save).toHaveBeenCalledWith(mockSegment);
    expect(result).toEqual(mockSegment);
  });

  it("should reject with an error if saving fails", async () => {
    const mockError = new Error("Failed to save");

    mockPreFilterSegmentRepository.save.mockRejectedValue(mockError);

    await expect(saveSegmentAction.execute(mockSegment)).rejects.toThrow("Failed to save");
    expect(mockPreFilterSegmentRepository.save).toHaveBeenCalledWith(mockSegment);
  });
});
