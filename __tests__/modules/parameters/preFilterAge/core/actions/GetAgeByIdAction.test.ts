import { GetAgeByIdAction } from "../../../../../../src/modules/parameters/preFilterAge/core/actions/GetAgeByIdAction";
import { preFilterAgeRepositoryMock, mockAge } from "../../mocks";
import { IPreFilterAgeRepository } from "../../../../../../src/modules/parameters/preFilterAge/core/repository/IPreFilterAgeRepository";

describe("GetAgeByIdAction", () => {
  let getAgeByIdAction: ReturnType<typeof GetAgeByIdAction>;
  let preFilterAgeRepository: jest.Mocked<IPreFilterAgeRepository>;

  beforeEach(() => {
    preFilterAgeRepository = preFilterAgeRepositoryMock();
    getAgeByIdAction = GetAgeByIdAction(preFilterAgeRepository);
  });

  it("should return an age object when execute is called with a valid ID", async () => {
    const id = "1";
    preFilterAgeRepository.getById.mockResolvedValue(mockAge);

    const result = await getAgeByIdAction.execute(id);

    expect(result).toEqual(mockAge);
    expect(preFilterAgeRepository.getById).toHaveBeenCalledWith(id);
    expect(preFilterAgeRepository.getById).toHaveBeenCalledTimes(1);
  });

  it("should throw AgeNotExistException when no age is found for the given ID", async () => {
    const id = "non-existent-id";
    preFilterAgeRepository.getById.mockResolvedValue(null);

    await expect(getAgeByIdAction.execute(id)).rejects.toThrow("Edad inexistente");    expect(preFilterAgeRepository.getById).toHaveBeenCalledWith(id);
    expect(preFilterAgeRepository.getById).toHaveBeenCalledTimes(1);
  });

  it("should handle errors when execute is called with an invalid ID", async () => {
    const id = "invalid-id";
    const error = new Error("Database error");
    preFilterAgeRepository.getById.mockRejectedValue(error);

    await expect(getAgeByIdAction.execute(id)).rejects.toThrow("Database error");
    expect(preFilterAgeRepository.getById).toHaveBeenCalledWith(id);
    expect(preFilterAgeRepository.getById).toHaveBeenCalledTimes(1);
  });
});
