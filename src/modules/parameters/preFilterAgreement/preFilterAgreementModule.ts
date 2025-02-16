import { DependencyManager } from "../../../dependencyManager";
import { PreFilterAgreementRepository } from "./infrastructure/repository/PreFilterAgreementRepository";
export const PreFilterAgreementModuleInitializer = (
  dependencyManager: DependencyManager
) => {
  const preFilterAgreementRepository = PreFilterAgreementRepository();
  dependencyManager.register(
    "preFilterAgreementRepository",
    preFilterAgreementRepository
  );
};
