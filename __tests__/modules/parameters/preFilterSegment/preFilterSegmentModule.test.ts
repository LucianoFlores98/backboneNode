import { describe, beforeEach, test, expect } from "@jest/globals";
import { PreFilterSegmentModuleInitializer } from "../../../../src/modules/parameters/preFilterSegment/preFilterSegmentModule";
import { DependencyManager } from "../../../../src/dependencyManager";
import { preFilterSegmentRepositoryMock } from "../../parameters/preFilterSegment/mocks";

describe("PreFilterSegmentModuleInitializer", () => {
  let dependencyManager: jest.Mocked<DependencyManager>;
  let preFilterSegmentRepository: ReturnType<typeof preFilterSegmentRepositoryMock>;

  beforeEach(() => {
    dependencyManager = {
      register: jest.fn(),
    } as unknown as jest.Mocked<DependencyManager>;

    preFilterSegmentRepository = preFilterSegmentRepositoryMock();
  });

  test("should register preFilterSegmentRepository with the DependencyManager", () => {
    PreFilterSegmentModuleInitializer(dependencyManager);

    expect(dependencyManager.register).toHaveBeenCalledWith(
      "preFilterSegmentRepository",
      expect.any(Object)
    );
  });

  test("should ensure preFilterSegmentRepository has expected methods", () => {
    PreFilterSegmentModuleInitializer(dependencyManager);

    const registeredRepository = dependencyManager.register.mock
      .calls[0][1] as typeof preFilterSegmentRepository;

    expect(registeredRepository.save).toBeDefined();
    expect(registeredRepository.getAll).toBeDefined();
    expect(registeredRepository.getById).toBeDefined();
    expect(registeredRepository.remove).toBeDefined();
    expect(registeredRepository.edit).toBeDefined();
  });
});
