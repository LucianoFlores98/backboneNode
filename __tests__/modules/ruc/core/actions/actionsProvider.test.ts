import { getRucActions } from "../../../../../src/modules/ruc/core/actions/actionsProvider";
import { rucRepositoryMock, mockRuc } from "../../mocks";

describe("actionsProvider", () => {
    let mockRucRepository : ReturnType<typeof rucRepositoryMock>  = rucRepositoryMock();
    let actions: ReturnType<typeof getRucActions> = getRucActions(mockRucRepository);

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should return all actions with the repository injected", () => {
        expect(actions).toHaveProperty("save");
        expect(actions).toHaveProperty("getAll");
    });

    it("should call save action with the correct data", async () => {
        const saveAction = mockRucRepository.save;
        saveAction.mockResolvedValueOnce(mockRuc);

        const result = await actions.save.execute(mockRuc);

        expect(saveAction).toHaveBeenCalledWith(mockRuc);
        expect(saveAction).toHaveBeenCalledTimes(1);
        expect(result).toBe(mockRuc);
    });

    it("should call getAll action and return the expected data", async () => {
        const getAllAction = mockRucRepository.getAll;
        getAllAction.mockResolvedValueOnce([mockRuc]);

        const result = await actions.getAll.execute("");

        expect(getAllAction).toHaveBeenCalled();
        expect(getAllAction).toHaveBeenCalledTimes(1);
        expect(result).toEqual([mockRuc]);
    });
});
