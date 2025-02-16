import { DependencyManager } from "../../../../../dependencyManager";
import { getPipeActions } from "../../core/actions/actionsProvider";
import { IPreFilterPipeRepository } from "../../core/repository/IPreFilterPipeRepository";
import { PreFilterControllers } from "./PreFilterPipeControllers";

export const getPreFilterControllers = (dependencyManager: DependencyManager) => {
  const PreFilterRepository = getPrefilterRepository(dependencyManager);
  const PreFilterActions = getPipeActions(PreFilterRepository);
  return PreFilterControllers(PreFilterActions);
};

const getPrefilterRepository = (dependencyManager: DependencyManager) => {
  return dependencyManager.resolve("preFilterPipeRepository") as IPreFilterPipeRepository;
};