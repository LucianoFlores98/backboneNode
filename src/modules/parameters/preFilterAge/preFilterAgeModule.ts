import { DependencyManager } from "../../../dependencyManager";
import { PreFilterAgeRepository } from "./infrastructure/repository/PreFilterAgeRepository";

export const PreFilterAgeModuleInitializer = (dependencyManager: DependencyManager) => {
  const preFilterAgeRepository = PreFilterAgeRepository();
  dependencyManager.register("preFilterAgeRepository", preFilterAgeRepository);
};
