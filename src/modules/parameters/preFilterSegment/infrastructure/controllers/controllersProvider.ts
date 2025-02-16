import { DependencyManager } from "../../../../../dependencyManager";
import { getSegmentActions } from "../../core/actions/actionsProvider";
import { IPreFilterSegmentRepository } from "../../core/repository/IPreFilterSegmentRepository";
import { PreFilterSegmentControllers } from "./PreFilterSegmentControllers";

export const getPreFilterSegmentControllers = (dependencyManager: DependencyManager) => {
  const PreFilterSegmentRepository = getPrefilterSegmentRepository(dependencyManager);
  const PreFilterSegmentActions = getSegmentActions(PreFilterSegmentRepository);
  return PreFilterSegmentControllers(PreFilterSegmentActions);
};

const getPrefilterSegmentRepository = (dependencyManager: DependencyManager) => {
  return dependencyManager.resolve("preFilterSegmentRepository") as IPreFilterSegmentRepository;
};