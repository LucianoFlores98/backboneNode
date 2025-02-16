import { RucRepository } from "../../.../../../../../src/modules/ruc/infrastructure/repository/RucRepository";
import RucModel from "../../.../../../../../src/modules/ruc/infrastructure/model/RucModel";
import { mockRuc } from "../../mocks";

jest.mock("../../.../../../../../src/modules/ruc/infrastructure/model/RucModel");

describe("RucRepository", () => {
    let repository: ReturnType<typeof RucRepository>;

    beforeEach(() => {
        jest.clearAllMocks();
        repository = RucRepository();
    });

    it("should save RUC register and return the created object", async () => {
        (RucModel.create as jest.Mock).mockResolvedValue({ toJSON: () => mockRuc });
        const result = await repository.save(mockRuc);
        expect(RucModel.create).toHaveBeenCalledWith({ 
            ...mockRuc, 
            createdAt: expect.any(Date), 
            updatedAt: expect.any(Date) 
        });
        expect(result).toEqual(mockRuc);
    });

    it("should return a list of RUCs matching the query", async () => {
        (RucModel.findAll as jest.Mock).mockResolvedValue([{ toJSON: () => mockRuc }]);
        const result = await repository.getAll({});
        expect(RucModel.findAll).toHaveBeenCalledWith({ where: {} });
        expect(result).toEqual([mockRuc]);
    });
});
