import { describe, beforeEach, test, expect } from "@jest/globals";
import { RucModuleInitializer } from "../../../src/modules/ruc/rucModule";
import { DependencyManager } from "../../../src/dependencyManager";
import { rucRepositoryMock } from "./mocks";

describe("RucModuleInitializer", () => {
    let dependencyManager: jest.Mocked<DependencyManager>;
    let rucRepository: ReturnType<typeof rucRepositoryMock>;

    beforeEach(() => {
        dependencyManager = {
            register: jest.fn(),
        } as unknown as jest.Mocked<DependencyManager>;

        rucRepository = rucRepositoryMock();
    });

    test("should register rucRepository with the DependencyManager", () => {
        RucModuleInitializer(dependencyManager);
        expect(dependencyManager.register).toHaveBeenCalledWith(
            "rucRepository",
            expect.any(Object)
        );
    });

    test("should ensure rucRepository has expected methods", () => {
        RucModuleInitializer(dependencyManager);

        const registeredRepository = dependencyManager.register.mock
            .calls[0][1] as typeof rucRepository;
        expect(registeredRepository.save).toBeDefined();
        expect(registeredRepository.getAll).toBeDefined();
    });
});
