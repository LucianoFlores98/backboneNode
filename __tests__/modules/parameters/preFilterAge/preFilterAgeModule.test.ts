import { describe, beforeEach, test, expect } from "@jest/globals";
import { PreFilterAgeModuleInitializer } from "../../../../src/modules/parameters/preFilterAge/preFilterAgeModule";
import { DependencyManager } from "../../../../src/dependencyManager";
import { preFilterAgeRepositoryMock } from "../../parameters/preFilterAge/mocks";

describe("PreFilterAgeModuleInitializer", () => {
  let dependencyManager: jest.Mocked<DependencyManager>;
  let preFilterAgeRepository: ReturnType<typeof preFilterAgeRepositoryMock>;

  beforeEach(() => {
    dependencyManager = {
      register: jest.fn(),
    } as unknown as jest.Mocked<DependencyManager>;

    preFilterAgeRepository = preFilterAgeRepositoryMock();
  });

  test("should register preFilterAgeRepository with the DependencyManager", () => {
    PreFilterAgeModuleInitializer(dependencyManager);

    expect(dependencyManager.register).toHaveBeenCalledWith(
      "preFilterAgeRepository",
      expect.any(Object)
    );
  });

  test("should ensure preFilterAgeRepository has expected methods", () => {
    PreFilterAgeModuleInitializer(dependencyManager);

    const registeredRepository = dependencyManager.register.mock
      .calls[0][1] as typeof preFilterAgeRepository;

    expect(registeredRepository.save).toBeDefined();
    expect(registeredRepository.getAll).toBeDefined();
    expect(registeredRepository.getById).toBeDefined();
    expect(registeredRepository.remove).toBeDefined();
    expect(registeredRepository.edit).toBeDefined();
  });
});
