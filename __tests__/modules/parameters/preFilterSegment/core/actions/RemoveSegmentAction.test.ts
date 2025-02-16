import { RemoveSegmentAction } from "../../../../../../src/modules/parameters/preFilterSegment/core/actions/RemoveSegmentAction";
import { preFilterSegmentRepositoryMock, mockSegment } from "../../mocks";
import { IPreFilterSegmentRepository } from "../../../../../../src/modules/parameters/preFilterSegment/core/repository/IPreFilterSegmentRepository";

describe("RemoveSegmentAction", () => {
  let removeSegmentAction: ReturnType<typeof RemoveSegmentAction>;
  let preFilterSegmentRepository: jest.Mocked<IPreFilterSegmentRepository>;

  beforeEach(() => {
    preFilterSegmentRepository = preFilterSegmentRepositoryMock();
    removeSegmentAction = RemoveSegmentAction(preFilterSegmentRepository);
  });

  it("should return the Segment object when execute is called with a valid ID and removes it", async () => {
    const id = 1;
    preFilterSegmentRepository.getById.mockResolvedValue(mockSegment);
    preFilterSegmentRepository.remove.mockResolvedValue(mockSegment);

    const result = await removeSegmentAction.execute(id);

    expect(result).toEqual(mockSegment);
    expect(preFilterSegmentRepository.getById).toHaveBeenCalledWith(id);
    expect(preFilterSegmentRepository.getById).toHaveBeenCalledTimes(1);
    expect(preFilterSegmentRepository.remove).toHaveBeenCalledWith(id);
    expect(preFilterSegmentRepository.remove).toHaveBeenCalledTimes(1);
  });

  it("should throw Segment NotExistException when no Segment is found for the given ID", async () => {
    const id = 999;
    preFilterSegmentRepository.getById.mockResolvedValue(null);

    await expect(removeSegmentAction.execute(id)).rejects.toThrow("Inexistent segment");
    expect(preFilterSegmentRepository.getById).toHaveBeenCalledWith(id);
    expect(preFilterSegmentRepository.getById).toHaveBeenCalledTimes(1);
    expect(preFilterSegmentRepository.remove).not.toHaveBeenCalled();
  });

  it("should handle errors thrown by the repository when executing remove", async () => {
    const id = 999;
    const error = new Error("Database error");
    preFilterSegmentRepository.getById.mockResolvedValue(mockSegment);
    preFilterSegmentRepository.remove.mockRejectedValue(error);

    await expect(removeSegmentAction.execute(id)).rejects.toThrow("Database error");
    expect(preFilterSegmentRepository.getById).toHaveBeenCalledWith(id);
    expect(preFilterSegmentRepository.getById).toHaveBeenCalledTimes(1);
    expect(preFilterSegmentRepository.remove).toHaveBeenCalledWith(id);
    expect(preFilterSegmentRepository.remove).toHaveBeenCalledTimes(1);
  });
});
