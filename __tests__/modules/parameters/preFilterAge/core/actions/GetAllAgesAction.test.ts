import { GetAllAgesAction } from "../../../../../../src/modules/parameters/preFilterAge/core/actions/GetAllAgesAction";
import { preFilterAgeRepositoryMock, mockAge } from "../../mocks";
import { IPreFilterAgeRepository } from "../../../../../../src/modules/parameters/preFilterAge/core/repository/IPreFilterAgeRepository";

describe("GetAllAgesAction", () => {
  let getAllAgesAction: ReturnType<typeof GetAllAgesAction>;
  let preFilterAgeRepository: jest.Mocked<IPreFilterAgeRepository>;

  beforeEach(() => {
    preFilterAgeRepository = preFilterAgeRepositoryMock();
    getAllAgesAction = GetAllAgesAction(preFilterAgeRepository);
  });

  it("should return an array of ages when execute is called", async () => {
    const query = {};
    preFilterAgeRepository.getAll.mockResolvedValue([mockAge]);

    const result = await getAllAgesAction.execute(query);

    expect(result).toEqual([mockAge]);
    expect(preFilterAgeRepository.getAll).toHaveBeenCalledWith(query);
    expect(preFilterAgeRepository.getAll).toHaveBeenCalledTimes(1);
  });

  it("should handle errors when execute is called", async () => {
    const query = {};
    const error = new Error("Database error");
    preFilterAgeRepository.getAll.mockRejectedValue(error);

    await expect(getAllAgesAction.execute(query)).rejects.toThrow("Database error");
    expect(preFilterAgeRepository.getAll).toHaveBeenCalledWith(query);
    expect(preFilterAgeRepository.getAll).toHaveBeenCalledTimes(1);
  });
});
