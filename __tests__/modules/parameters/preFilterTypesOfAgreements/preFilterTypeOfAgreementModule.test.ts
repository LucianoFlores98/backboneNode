import { describe, beforeEach, test, expect } from "@jest/globals";
import {PreFilterTypeOfAgreementModuleInitializer} from "../../../../src/modules/parameters/preFilterTypesOfAgreements/preFilterTypeOfAgreementModule";
import { DependencyManager } from "../../../../src/dependencyManager";
import { preFilterTypesOfAgreementsRepositoryMock } from "./mocks";

describe("PreFilterTypeOfAgreementModuleInitializer", () => {
  let dependencyManager: jest.Mocked<DependencyManager>;
  let preFilterTypeOfAgreementRepository: ReturnType<typeof preFilterTypesOfAgreementsRepositoryMock>;

  beforeEach(() => {
    dependencyManager = {
      register: jest.fn(),
    } as unknown as jest.Mocked<DependencyManager>;

    preFilterTypeOfAgreementRepository = preFilterTypesOfAgreementsRepositoryMock();
  });

  test("should register preFilterTypeOfAgreementRepository with the DependencyManager", () => {
    PreFilterTypeOfAgreementModuleInitializer(dependencyManager);

    expect(dependencyManager.register).toHaveBeenCalledWith(
      "preFilterTypeOfAgreementRepository",
      expect.any(Object)
    );
  });

  test("should ensure preFilterTypeOfAgreementRepository has expected methods", () => {
    PreFilterTypeOfAgreementModuleInitializer(dependencyManager);

    const registeredRepository = dependencyManager.register.mock
      .calls[0][1] as typeof preFilterTypeOfAgreementRepository;

    expect(registeredRepository.save).toBeDefined();
    expect(registeredRepository.getAll).toBeDefined();
    expect(registeredRepository.getById).toBeDefined();
    expect(registeredRepository.remove).toBeDefined();
    expect(registeredRepository.edit).toBeDefined();
  });
});
