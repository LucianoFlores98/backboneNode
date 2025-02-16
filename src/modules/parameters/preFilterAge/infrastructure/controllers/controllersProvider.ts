import { DependencyManager } from "../../../../../dependencyManager";
import { getAgeActions } from "../../core/actions/actionsProvider";
import { IPreFilterAgeRepository } from "../../core/repository/IPreFilterAgeRepository";
import { PreFilterAgeControllers } from "./PreFilterAgeControllers";

export const getPreFilterAgeControllers = (dependencyManager: DependencyManager) => {
  const PreFilterRepository = getPrefilterRepository(dependencyManager);
  const PreFilterActions = getAgeActions(PreFilterRepository);
  return PreFilterAgeControllers(PreFilterActions);
};

const getPrefilterRepository = (dependencyManager: DependencyManager) => {
  return dependencyManager.resolve("preFilterAgeRepository") as IPreFilterAgeRepository;
};