import { DependencyManager } from "../../../dependencyManager";
import { PreFilterSegmentRepository } from "./infrastructure/repository/PreFilterSegmentRepository";

export const PreFilterSegmentModuleInitializer = (dependencyManager: DependencyManager) => {
  const preFilterSegmentRepository = PreFilterSegmentRepository();
  dependencyManager.register("preFilterSegmentRepository", preFilterSegmentRepository);
};
