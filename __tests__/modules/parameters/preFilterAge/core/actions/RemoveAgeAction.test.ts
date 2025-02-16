import { RemoveAgeAction } from "../../../../../../src/modules/parameters/preFilterAge/core/actions/RemoveAgeAction";
import { preFilterAgeRepositoryMock, mockAge } from "../../mocks";
import { IPreFilterAgeRepository } from "../../../../../../src/modules/parameters/preFilterAge/core/repository/IPreFilterAgeRepository";

describe("RemoveAgeAction", () => {
  let removeAgeAction: ReturnType<typeof RemoveAgeAction>;
  let preFilterAgeRepository: jest.Mocked<IPreFilterAgeRepository>;

  beforeEach(() => {
    preFilterAgeRepository = preFilterAgeRepositoryMock();
    removeAgeAction = RemoveAgeAction(preFilterAgeRepository);
  });

  it("should return the age object when execute is called with a valid ID and removes it", async () => {
    const id = "1";
    preFilterAgeRepository.getById.mockResolvedValue(mockAge);
    preFilterAgeRepository.remove.mockResolvedValue(mockAge);

    const result = await removeAgeAction.execute(id);

    expect(result).toEqual(mockAge);
    expect(preFilterAgeRepository.getById).toHaveBeenCalledWith(id);
    expect(preFilterAgeRepository.getById).toHaveBeenCalledTimes(1);
    expect(preFilterAgeRepository.remove).toHaveBeenCalledWith(id);
    expect(preFilterAgeRepository.remove).toHaveBeenCalledTimes(1);
  });

  it("should throw AgeNotExistException when no age is found for the given ID", async () => {
    const id = "non-existent-id";
    preFilterAgeRepository.getById.mockResolvedValue(null);

    await expect(removeAgeAction.execute(id)).rejects.toThrow("Edad inexistente");
    expect(preFilterAgeRepository.getById).toHaveBeenCalledWith(id);
    expect(preFilterAgeRepository.getById).toHaveBeenCalledTimes(1);
    expect(preFilterAgeRepository.remove).not.toHaveBeenCalled();
  });

  it("should handle errors thrown by the repository when executing remove", async () => {
    const id = "1";
    const error = new Error("Database error");
    preFilterAgeRepository.getById.mockResolvedValue(mockAge);
    preFilterAgeRepository.remove.mockRejectedValue(error);

    await expect(removeAgeAction.execute(id)).rejects.toThrow("Database error");
    expect(preFilterAgeRepository.getById).toHaveBeenCalledWith(id);
    expect(preFilterAgeRepository.getById).toHaveBeenCalledTimes(1);
    expect(preFilterAgeRepository.remove).toHaveBeenCalledWith(id);
    expect(preFilterAgeRepository.remove).toHaveBeenCalledTimes(1);
  });
});
