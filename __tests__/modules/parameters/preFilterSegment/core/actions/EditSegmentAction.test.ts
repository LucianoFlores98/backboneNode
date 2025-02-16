import { EditSegmentAction } from "../../../../../../src/modules/parameters/preFilterSegment/core/actions/EditSegmentAction";
import { preFilterSegmentRepositoryMock, mockSegment } from "../../mocks";

describe("EditSegmentAction", () => {
  let mockPreFilterSegmentRepository: ReturnType<typeof preFilterSegmentRepositoryMock>;
  let editSegmentAction: ReturnType<typeof EditSegmentAction>;

  beforeEach(() => {
    mockPreFilterSegmentRepository = preFilterSegmentRepositoryMock();
    editSegmentAction = EditSegmentAction(mockPreFilterSegmentRepository);
  });

  it("should successfully edit an Segment and return the result", async () => {
    const updatedMockSegment = { ...mockSegment, value: 1 };

    mockPreFilterSegmentRepository.getById.mockResolvedValueOnce(mockSegment); 
    mockPreFilterSegmentRepository.edit.mockResolvedValueOnce(updatedMockSegment); 
    mockPreFilterSegmentRepository.getById.mockResolvedValueOnce(updatedMockSegment); 

    const result = await editSegmentAction.execute(updatedMockSegment, updatedMockSegment.id);

    expect(mockPreFilterSegmentRepository.getById).toHaveBeenCalledWith(updatedMockSegment.id);
    expect(mockPreFilterSegmentRepository.edit).toHaveBeenCalledWith(updatedMockSegment, updatedMockSegment.id);
    expect(result).toEqual(updatedMockSegment);
  });

  it("should throw Segment NotExistException if Segment does not exist", async () => {
    const nonExistentId = 999;

    mockPreFilterSegmentRepository.getById = jest.fn().mockResolvedValue(null);

    await expect(editSegmentAction.execute(mockSegment, nonExistentId)).rejects.toThrow("Inexistent segment");
  
    expect(mockPreFilterSegmentRepository.getById).toHaveBeenCalledWith(nonExistentId);
  });

  it("should reject with an error if repository operations fail", async () => {
    const mockError = new Error("Failed to edit");

    mockPreFilterSegmentRepository.getById.mockResolvedValueOnce(mockSegment); 
    mockPreFilterSegmentRepository.edit.mockRejectedValueOnce(mockError);

    await expect(editSegmentAction.execute(mockSegment, mockSegment.id)).rejects.toThrow("Failed to edit");
    expect(mockPreFilterSegmentRepository.getById).toHaveBeenCalledWith(mockSegment.id);
    expect(mockPreFilterSegmentRepository.edit).toHaveBeenCalledWith(mockSegment, mockSegment.id);
  });
});
