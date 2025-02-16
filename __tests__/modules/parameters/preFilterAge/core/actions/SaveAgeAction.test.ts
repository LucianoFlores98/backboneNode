import { SaveAgeAction } from "../../../../../../src/modules/parameters/preFilterAge/core/actions/SaveAgeAction";
import { IPreFilterAgeRepository } from "../../../../../../src/modules/parameters/preFilterAge/core/repository/IPreFilterAgeRepository";
import { preFilterAgeRepositoryMock, mockAge } from "../../mocks";

describe("SaveAgeAction", () => {
  let mockPreFilterAgeRepository: jest.Mocked<IPreFilterAgeRepository>;
  let saveAgeAction: ReturnType<typeof SaveAgeAction>;

  beforeEach(() => {
    mockPreFilterAgeRepository = preFilterAgeRepositoryMock();
    saveAgeAction = SaveAgeAction(mockPreFilterAgeRepository);
  });

  it("should successfully save an age and return the result", async () => {
    mockPreFilterAgeRepository.save.mockResolvedValue(mockAge);

    const result = await saveAgeAction.execute(mockAge);

    expect(mockPreFilterAgeRepository.save).toHaveBeenCalledWith(mockAge);
    expect(result).toEqual(mockAge);
  });

  it("should reject with an error if saving fails", async () => {
    const mockError = new Error("Failed to save");

    mockPreFilterAgeRepository.save.mockRejectedValue(mockError);

    await expect(saveAgeAction.execute(mockAge)).rejects.toThrow("Failed to save");
    expect(mockPreFilterAgeRepository.save).toHaveBeenCalledWith(mockAge);
  });
});
