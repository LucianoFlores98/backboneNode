import { DependencyManager } from "../../../../../dependencyManager";
import { getAgreementActions } from "../../core/actions/actionsProvider";
import { IPreFilterAgreementRepository } from "../../core/repository/IPreFilterAgreementRepository";
import { PreFilterAgreementControllers } from "./PreFilterAgreementControllers";

export const getPreFilterAgreementControllers = (dependencyManager: DependencyManager) => {
  const PreFilterRepository = getPrefilterRepository(dependencyManager);
  const PreFilterActions = getAgreementActions(PreFilterRepository);
  return PreFilterAgreementControllers(PreFilterActions);
};

const getPrefilterRepository = (dependencyManager: DependencyManager) => {
  return dependencyManager.resolve("preFilterAgreementRepository") as IPreFilterAgreementRepository;
};