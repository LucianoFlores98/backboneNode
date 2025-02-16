import { DependencyManager } from "../../../dependencyManager";
import { PreFilterPipeRepository } from "./infrastructure/repository/PreFilterPipeRepository";

export const PreFilterPipeModuleInitializer = (dependencyManager: DependencyManager) => {
  const preFilterPipeRepository = PreFilterPipeRepository();
  dependencyManager.register("preFilterPipeRepository", preFilterPipeRepository);
};
