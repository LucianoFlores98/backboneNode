import { EditAgeAction } from "../../../../../../src/modules/parameters/preFilterAge/core/actions/EditAgeAction";
import { preFilterAgeRepositoryMock, mockAge } from "../../mocks";

describe("EditAgeAction", () => {
  let mockPreFilterAgeRepository: ReturnType<typeof preFilterAgeRepositoryMock>;
  let editAgeAction: ReturnType<typeof EditAgeAction>;

  beforeEach(() => {
    mockPreFilterAgeRepository = preFilterAgeRepositoryMock();
    editAgeAction = EditAgeAction(mockPreFilterAgeRepository);
  });

  it("should successfully edit an age and return the result", async () => {
    const updatedMockAge = { ...mockAge, value: "35" };

    mockPreFilterAgeRepository.getById.mockResolvedValueOnce(mockAge); 
    mockPreFilterAgeRepository.edit.mockResolvedValueOnce(updatedMockAge); 
    mockPreFilterAgeRepository.getById.mockResolvedValueOnce(updatedMockAge); 

    const result = await editAgeAction.execute(updatedMockAge, updatedMockAge.id);

    expect(mockPreFilterAgeRepository.getById).toHaveBeenCalledWith(updatedMockAge.id);
    expect(mockPreFilterAgeRepository.edit).toHaveBeenCalledWith(updatedMockAge, updatedMockAge.id);
    expect(result).toEqual(updatedMockAge);
  });

  it("should throw AgeNotExistException if age does not exist", async () => {
    const nonExistentId = "999";

    mockPreFilterAgeRepository.getById.mockResolvedValueOnce(null);

    await expect(editAgeAction.execute(mockAge, nonExistentId)).rejects.toThrow("Edad inexistente");
    expect(mockPreFilterAgeRepository.getById).toHaveBeenCalledWith(nonExistentId);
    expect(mockPreFilterAgeRepository.edit).toHaveBeenCalled();
  });

  it("should reject with an error if repository operations fail", async () => {
    const mockError = new Error("Failed to edit");

    mockPreFilterAgeRepository.getById.mockResolvedValueOnce(mockAge); 
    mockPreFilterAgeRepository.edit.mockRejectedValueOnce(mockError);

    await expect(editAgeAction.execute(mockAge, mockAge.id)).rejects.toThrow("Failed to edit");
    expect(mockPreFilterAgeRepository.getById).toHaveBeenCalledWith(mockAge.id);
    expect(mockPreFilterAgeRepository.edit).toHaveBeenCalledWith(mockAge, mockAge.id);
  });
});
