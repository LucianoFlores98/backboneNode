import { PreFilterAgeRepository } from "../../.../../../../../../src/modules/parameters/preFilterAge/infrastructure/repository/PreFilterAgeRepository";
import AgeModel from "../../../../../../src/modules/parameters/preFilterAge/infrastructure/models/AgeModel";
import { mockAge } from "../../mocks";

jest.mock("../../../../../../src/modules/parameters/preFilterAge/infrastructure/models/AgeModel");

describe("PreFilterAgeRepository", () => {
  let repository: ReturnType<typeof PreFilterAgeRepository>;

  beforeEach(() => {
    repository = PreFilterAgeRepository();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should save an age and return the created object", async () => {
    (AgeModel.create as jest.Mock).mockResolvedValue({
      toJSON: () => mockAge,
    });

    const result = await repository.save(mockAge);

    expect(AgeModel.create).toHaveBeenCalledWith({
      ...mockAge,
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    });
    expect(result).toEqual(mockAge);
  });

  it("should edit an age and return the updated object", async () => {
    (AgeModel.update as jest.Mock).mockResolvedValue([1, [{ toJSON: () => mockAge }]]);

    const result = await repository.edit(mockAge, mockAge.id);

    expect(AgeModel.update).toHaveBeenCalledWith(
      { ...mockAge, updatedAt: expect.any(Date) },
      { where: { id: mockAge.id }, returning: true }
    );
    expect(result).toEqual(mockAge);
  });

  it("should throw an error if the object is not found or updated", async () => {
    (AgeModel.update as jest.Mock).mockResolvedValue([0, []]);

    await expect(repository.edit(mockAge, mockAge.id)).rejects.toThrow("Age not found or not updated");
  });

  it("should delete an age and return the deleted object", async () => {
    (AgeModel.findOne as jest.Mock).mockResolvedValue({
      destroy: jest.fn(),
      toJSON: () => mockAge,
    });

    const result = await repository.remove(mockAge.id);

    expect(AgeModel.findOne).toHaveBeenCalledWith({ where: { id: mockAge.id } });
    expect(result).toEqual(mockAge);
  });

  it("should return null if the age to be deleted is not found", async () => {
    (AgeModel.findOne as jest.Mock).mockResolvedValue(null);

    const result = await repository.remove(mockAge.id);

    expect(AgeModel.findOne).toHaveBeenCalledWith({ where: { id: mockAge.id } });
    expect(result).toBeNull();
  });

  it("should return a list of ages matching the query", async () => {
    (AgeModel.findAll as jest.Mock).mockResolvedValue([{ toJSON: () => mockAge }]);

    const result = await repository.getAll({});

    expect(AgeModel.findAll).toHaveBeenCalledWith({ where: {} });
    expect(result).toEqual([mockAge]);
  });

  it("should return an age if the id is found", async () => {
    (AgeModel.findOne as jest.Mock).mockResolvedValue({ toJSON: () => mockAge });

    const result = await repository.getById(mockAge.id);

    expect(AgeModel.findOne).toHaveBeenCalledWith({ where: { id: mockAge.id } });
    expect(result).toEqual(mockAge);
  });

  it("should return null if the age is not found with id", async () => {
    (AgeModel.findOne as jest.Mock).mockResolvedValue(null);

    const result = await repository.getById(mockAge.id);

    expect(AgeModel.findOne).toHaveBeenCalledWith({ where: { id: mockAge.id } });
    expect(result).toBeNull();
  });
});
