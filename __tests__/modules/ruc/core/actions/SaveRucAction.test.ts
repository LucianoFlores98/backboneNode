import { SaveRucAction } from "../../../../../src/modules/ruc/core/actions/SaveRucAction";
import { IRucRepository } from "../../../../../src/modules/ruc/core/repository/IRucRepository";
import { rucRepositoryMock, mockRuc } from "../../mocks";

describe("SaveRucAction", () => {
    let mockRucRepository: jest.Mocked<IRucRepository>;
    let saveRucAction: ReturnType<typeof SaveRucAction>;

    beforeEach(() => {
        mockRucRepository = rucRepositoryMock();
        saveRucAction = SaveRucAction(mockRucRepository);
    });

    it("should successfully save a RUC and return the result", async () => {
        mockRucRepository.save.mockResolvedValue(mockRuc);
        const result = await saveRucAction.execute(mockRuc);

        expect(mockRucRepository.save).toHaveBeenCalledWith(mockRuc);
        expect(result).toEqual(mockRuc);
    });

    it("should reject with an error if saving fails", async () => {
        const error = new Error();
        mockRucRepository.save.mockRejectedValue(error);

        await expect(saveRucAction.execute(mockRuc)).rejects.toThrow();
        expect(mockRucRepository.save).toHaveBeenCalledWith(mockRuc);
    });
});
