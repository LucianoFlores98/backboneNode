import { PreFilterSegmentRepository } from "../../.../../../../../../src/modules/parameters/preFilterSegment/infrastructure/repository/PreFilterSegmentRepository";
import SegmentModel from "../../../../../../src/modules/parameters/preFilterSegment/infrastructure/models/SegmentModel";
import { mockSegment } from "../../mocks";

jest.mock("../../../../../../src/modules/parameters/preFilterSegment/infrastructure/models/SegmentModel");

describe("PreFilterSegmentRepository", () => {
  let repository: ReturnType<typeof PreFilterSegmentRepository>;

  beforeEach(() => {
    repository = PreFilterSegmentRepository();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should save an Segment and return the created object", async () => {
    (SegmentModel.create as jest.Mock).mockResolvedValue({
      toJSON: () => mockSegment,
    });

    const result = await repository.save(mockSegment);

    expect(SegmentModel.create).toHaveBeenCalledWith({
      ...mockSegment,
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    });
    expect(result).toEqual(mockSegment);
  });

  it("should edit an Segment and return the updated object", async () => {
    (SegmentModel.update as jest.Mock).mockResolvedValue([1, [{ toJSON: () => mockSegment }]]);

    const result = await repository.edit(mockSegment, mockSegment.id);

    expect(SegmentModel.update).toHaveBeenCalledWith(
      { ...mockSegment, updatedAt: expect.any(Date) },
      { where: { id: mockSegment.id }, returning: true }
    );
    expect(result).toEqual(mockSegment);
  });

  it("should throw an error if the object is not found or updated", async () => {
    (SegmentModel.update as jest.Mock).mockResolvedValue([0, []]);

    await expect(repository.edit(mockSegment, mockSegment.id)).rejects.toThrow("Segment not found or not updated");
  });

  it("should delete an Segment and return the deleted object", async () => {
    (SegmentModel.findOne as jest.Mock).mockResolvedValue({
      destroy: jest.fn(),
      toJSON: () => mockSegment,
    });

    const result = await repository.remove(mockSegment.id);

    expect(SegmentModel.findOne).toHaveBeenCalledWith({ where: { id: mockSegment.id } });
    expect(result).toEqual(mockSegment);
  });

  it("should return null if the Segment to be deleted is not found", async () => {
    (SegmentModel.findOne as jest.Mock).mockResolvedValue(null);

    const result = await repository.remove(mockSegment.id);

    expect(SegmentModel.findOne).toHaveBeenCalledWith({ where: { id: mockSegment.id } });
    expect(result).toBeNull();
  });

  it("should return a list of Segments matching the query", async () => {
    (SegmentModel.findAll as jest.Mock).mockResolvedValue([{ toJSON: () => mockSegment }]);

    const result = await repository.getAll({});

    expect(SegmentModel.findAll).toHaveBeenCalledWith({ where: {} });
    expect(result).toEqual([mockSegment]);
  });

  it("should return an Segment if the id is found", async () => {
    (SegmentModel.findOne as jest.Mock).mockResolvedValue({ toJSON: () => mockSegment });

    const result = await repository.getById(mockSegment.id);

    expect(SegmentModel.findOne).toHaveBeenCalledWith({ where: { id: mockSegment.id } });
    expect(result).toEqual(mockSegment);
  });

  it("should return null if the Segment is not found with id", async () => {
    (SegmentModel.findOne as jest.Mock).mockResolvedValue(null);

    const result = await repository.getById(mockSegment.id);

    expect(SegmentModel.findOne).toHaveBeenCalledWith({ where: { id: mockSegment.id } });
    expect(result).toBeNull();
  });
});
