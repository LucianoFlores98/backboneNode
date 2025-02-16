import { describe, beforeEach, test, expect } from "@jest/globals";
import { PreFilterAgreementModuleInitializer } from "../../../../src/modules/parameters/preFilterAgreement/preFilterAgreementModule";
import { DependencyManager } from "../../../../src/dependencyManager";
import { preFilterAgreementRepositoryMock } from "../../parameters/preFilterAgreement/mocks";

describe("PreFilterAgreementModuleInitializer", () => {
  let dependencyManager: jest.Mocked<DependencyManager>;
  let preFilterAgreementRepository: ReturnType<typeof preFilterAgreementRepositoryMock>;

  beforeEach(() => {
    dependencyManager = {
      register: jest.fn(),
    } as unknown as jest.Mocked<DependencyManager>;

    preFilterAgreementRepository = preFilterAgreementRepositoryMock();
  });

  test("should register preFilterAgreementRepository with the DependencyManager", () => {
    PreFilterAgreementModuleInitializer(dependencyManager);

    expect(dependencyManager.register).toHaveBeenCalledWith(
      "preFilterAgreementRepository",
      expect.any(Object)
    );
  });

  test("should ensure preFilterAgreementRepository has expected methods", () => {
    PreFilterAgreementModuleInitializer(dependencyManager);

    const registeredRepository = dependencyManager.register.mock
      .calls[0][1] as typeof preFilterAgreementRepository;

    expect(registeredRepository.save).toBeDefined();
    expect(registeredRepository.getAll).toBeDefined();
    expect(registeredRepository.getById).toBeDefined();
    expect(registeredRepository.remove).toBeDefined();
    expect(registeredRepository.edit).toBeDefined();
  });
});
