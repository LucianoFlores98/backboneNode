import { PreFilterPipeRepository } from "../../../../../../src/modules/parameters/preFilterPipe/infrastructure/repository/PreFilterPipeRepository";
import PipeModel from "../../../../../../src/modules/parameters/preFilterPipe/infrastructure/models/PipeModel";
import { mockPipe } from "../../mocks";

jest.mock(
  "../../../../../../src/modules/parameters/preFilterPipe/infrastructure/models/PipeModel"
);

describe("PreFilterPipeRepository", () => {
  let repository: ReturnType<typeof PreFilterPipeRepository>;

  beforeEach(() => {
    repository = PreFilterPipeRepository();
    jest.clearAllMocks();
  });

  it("should save a new pipe and return the created pipe", async () => {
    (PipeModel.create as jest.Mock).mockResolvedValue({
      toJSON: () => mockPipe,
    });

    const result = await repository.save(mockPipe);
    expect(result).toEqual(mockPipe);
  });

  it("should update an existing pipe by id", async () => {
    const updatedPipe = { ...mockPipe, key: "newKey" };
    (PipeModel.update as jest.Mock).mockResolvedValue([
      1,
      [
        {
          ...updatedPipe,
          toJSON: () => updatedPipe,
        },
      ],
    ]);

    const result = await repository.edit(updatedPipe, "1");
    expect(result).toEqual(updatedPipe);
  });

  it("should throw an error if pipe to edit does not exist", async () => {
    (PipeModel.update as jest.Mock).mockResolvedValue([0, []]);

    await expect(
      repository.edit(
        {
          key: "key",
          value: "value",
          id: "99",
          order: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        "99"
      )
    ).rejects.toThrow("Parámetro Pipe no encontrado");
  });

  it("should delete a pipe by id", async () => {
    (PipeModel.findOne as jest.Mock).mockResolvedValue({
      toJSON: () => mockPipe,
      destroy: jest.fn(),
    });

    const result = await repository.remove("1");
    expect(result).toEqual(mockPipe);
  });

  it("should return null if pipe to remove does not exist", async () => {
    (PipeModel.findOne as jest.Mock).mockResolvedValue(null);

    const result = await repository.remove("99");
    expect(result).toBeNull();
  });

  it("should return all pipes", async () => {
    (PipeModel.findAll as jest.Mock).mockResolvedValue([
      { toJSON: () => mockPipe },
    ]);

    const result = await repository.getAll({});
    expect(result).toEqual([mockPipe]);
  });

  it("should return a pipe by id", async () => {
    (PipeModel.findOne as jest.Mock).mockResolvedValue({
      toJSON: () => mockPipe,
    });

    const result = await repository.getById("1");
    expect(result).toEqual(mockPipe);
  });

  it("should return null if pipe by id does not exist", async () => {
    (PipeModel.findOne as jest.Mock).mockResolvedValue(null);

    const result = await repository.getById("99");
    expect(result).toBeNull();
  });
});
