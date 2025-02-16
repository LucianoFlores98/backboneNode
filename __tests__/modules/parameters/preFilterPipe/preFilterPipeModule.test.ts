import { describe, beforeEach, test, expect } from "@jest/globals";
import { PreFilterPipeModuleInitializer } from "../../../../src/modules/parameters/preFilterPipe/preFilterPipeModule";
import { DependencyManager } from "../../../../src/dependencyManager";
import { createMockPreFilterPipeRepository } from "../../parameters/preFilterPipe/mocks";

describe("PreFilterPipeModuleInitializer", () => {
  let dependencyManager: jest.Mocked<DependencyManager>;
  let preFilterPipeRepository: ReturnType<typeof createMockPreFilterPipeRepository>;

  beforeEach(() => {
    dependencyManager = {
      register: jest.fn(),
    } as unknown as jest.Mocked<DependencyManager>;

    preFilterPipeRepository = createMockPreFilterPipeRepository();
  });

  test("should register preFilterPipeRepository with the DependencyManager", () => {
    PreFilterPipeModuleInitializer(dependencyManager);

    expect(dependencyManager.register).toHaveBeenCalledWith(
      "preFilterPipeRepository",
      expect.any(Object)
    );
  });
  
  test("should ensure preFilterPipeRepository has expected methods", () => {
    PreFilterPipeModuleInitializer(dependencyManager);

    const registeredRepository = dependencyManager.register.mock.calls[0][1] as typeof preFilterPipeRepository;

    expect(registeredRepository.save).toBeDefined();
    expect(registeredRepository.getAll).toBeDefined();
    expect(registeredRepository.getById).toBeDefined();
    expect(registeredRepository.remove).toBeDefined();
    expect(registeredRepository.edit).toBeDefined();
  });
});
