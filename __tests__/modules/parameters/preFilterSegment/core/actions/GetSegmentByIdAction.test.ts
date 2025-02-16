import { GetSegmentByIdAction } from "../../../../../../src/modules/parameters/preFilterSegment/core/actions/GetSegmentByIdAction";
import { preFilterSegmentRepositoryMock, mockSegment } from "../../mocks";
import { IPreFilterSegmentRepository } from "../../../../../../src/modules/parameters/preFilterSegment/core/repository/IPreFilterSegmentRepository";

describe("GetSegmentByIdAction", () => {
  let getSegmentByIdAction: ReturnType<typeof GetSegmentByIdAction>;
  let preFilterSegmentRepository: jest.Mocked<IPreFilterSegmentRepository>;

  beforeEach(() => {
    preFilterSegmentRepository = preFilterSegmentRepositoryMock();
    getSegmentByIdAction = GetSegmentByIdAction(preFilterSegmentRepository);
  });

  it("should return an Segment object when execute is called with a valid ID", async () => {
    const id = 1;
    preFilterSegmentRepository.getById.mockResolvedValue(mockSegment);

    const result = await getSegmentByIdAction.execute(1);

    expect(result).toEqual(mockSegment);
    expect(preFilterSegmentRepository.getById).toHaveBeenCalledWith(id);
    expect(preFilterSegmentRepository.getById).toHaveBeenCalledTimes(1);
  });

  it("should throw Segment NotExistException when no Segment is found for the given ID", async () => {
    const id = 999;
    preFilterSegmentRepository.getById.mockResolvedValue(null);

    await expect(getSegmentByIdAction.execute(id)).rejects.toThrow("Inexistent segment");    expect(preFilterSegmentRepository.getById).toHaveBeenCalledWith(id);
    expect(preFilterSegmentRepository.getById).toHaveBeenCalledTimes(1);
  });

  it("should handle errors when execute is called with an invalid ID", async () => {
    const id = 999;
    const error = new Error("Database error");
    preFilterSegmentRepository.getById.mockRejectedValue(error);

    await expect(getSegmentByIdAction.execute(id)).rejects.toThrow("Database error");
    expect(preFilterSegmentRepository.getById).toHaveBeenCalledWith(id);
    expect(preFilterSegmentRepository.getById).toHaveBeenCalledTimes(1);
  });
});
