import { GetAllSegmentsAction } from "../../../../../../src/modules/parameters/preFilterSegment/core/actions/GetAllSegmentsAction";
import { preFilterSegmentRepositoryMock, mockSegment } from "../../mocks";
import { IPreFilterSegmentRepository } from "../../../../../../src/modules/parameters/preFilterSegment/core/repository/IPreFilterSegmentRepository";

describe("GetAllSegmentsAction", () => {
  let getAllSegmentsAction: ReturnType<typeof GetAllSegmentsAction>;
  let preFilterSegmentRepository: jest.Mocked<IPreFilterSegmentRepository>;

  beforeEach(() => {
    preFilterSegmentRepository = preFilterSegmentRepositoryMock();
    getAllSegmentsAction = GetAllSegmentsAction(preFilterSegmentRepository);
  });

  it("should return an array of Segments when execute is called", async () => {
    const query = {};
    preFilterSegmentRepository.getAll.mockResolvedValue([mockSegment]);

    const result = await getAllSegmentsAction.execute(query);

    expect(result).toEqual([mockSegment]);
    expect(preFilterSegmentRepository.getAll).toHaveBeenCalledWith(query);
    expect(preFilterSegmentRepository.getAll).toHaveBeenCalledTimes(1);
  });

  it("should handle errors when execute is called", async () => {
    const query = {};
    const error = new Error("Database error");
    preFilterSegmentRepository.getAll.mockRejectedValue(error);

    await expect(getAllSegmentsAction.execute(query)).rejects.toThrow("Database error");
    expect(preFilterSegmentRepository.getAll).toHaveBeenCalledWith(query);
    expect(preFilterSegmentRepository.getAll).toHaveBeenCalledTimes(1);
  });
});
