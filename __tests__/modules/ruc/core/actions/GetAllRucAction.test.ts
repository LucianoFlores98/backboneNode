import { GetAllRucAction } from "../../../../../src/modules/ruc/core/actions/GetAllRucAction";
import { rucRepositoryMock, mockRuc } from "../../mocks";
import { IRucRepository } from "../../../../../src/modules/ruc/core/repository/IRucRepository";

describe("GetAllRucAction", () => {
    let getAllRucAction: ReturnType<typeof GetAllRucAction>;
    let rucRepository: jest.Mocked<IRucRepository>;

    beforeEach(() => {
        rucRepository = rucRepositoryMock();
        getAllRucAction = GetAllRucAction(rucRepository);
    });

    it("should return an array of RUCs when execute is called", async () => {
        const query = {};
        rucRepository.getAll.mockResolvedValue([mockRuc]);

        const result = await getAllRucAction.execute(query);

        expect(result).toEqual([mockRuc]);
        expect(rucRepository.getAll).toHaveBeenCalledWith(query);
        expect(rucRepository.getAll).toHaveBeenCalledTimes(1);
    });

    it("should handle errors when execute is called", async () => {
        const query = {};
        const error = new Error();
        rucRepository.getAll.mockRejectedValue(error);

        await expect(getAllRucAction.execute(query)).rejects.toThrow();
        expect(rucRepository.getAll).toHaveBeenCalledWith(query);
        expect(rucRepository.getAll).toHaveBeenCalledTimes(1);
    });
});
