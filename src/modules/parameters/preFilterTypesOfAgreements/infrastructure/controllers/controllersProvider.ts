import { DependencyManager } from "../../../../../dependencyManager";
import { getPreFilterTypeOfAgreementActions } from "../../core/actions/actionsProvider";
import { IPreFilterTypesOfAgreementRepository } from "../../core/repository/IPreFilterTypesOfAgreementsRepository";
import { PreFilterTypeOfAgreementsControllers } from "./PreFilterTypesOfAgreementsControllers";

export const getPreFilterTypeOfAgreementControllers = (dependencyManager: DependencyManager) => {
    const PreFilterRepository = getPrefilterRepository(dependencyManager);
    const PreFilterActions = getPreFilterTypeOfAgreementActions(PreFilterRepository);
    return PreFilterTypeOfAgreementsControllers(PreFilterActions);
};

const getPrefilterRepository = (dependencyManager: DependencyManager) => {
    return dependencyManager.resolve("preFilterTypeOfAgreementRepository") as IPreFilterTypesOfAgreementRepository;
};