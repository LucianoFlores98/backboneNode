import { DependencyManager } from "../../../dependencyManager";
import { PreFilterTypeOfAgreementRepository } from "./infrastructure/repository/PreFilterTypeOfAgreementRepository";

export const PreFilterTypeOfAgreementModuleInitializer = (dependencyManager: DependencyManager) => {
    const preFilterTypeOfAgreementRepository = PreFilterTypeOfAgreementRepository();
    dependencyManager.register("preFilterTypeOfAgreementRepository", preFilterTypeOfAgreementRepository);
};
