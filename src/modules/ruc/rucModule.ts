import { DependencyManager } from "../../dependencyManager";
import { RucRepository } from "./infrastructure/repository/RucRepository";

export const RucModuleInitializer = (dependencyManager: DependencyManager) => {
    const rucRepository = RucRepository();
    dependencyManager.register("rucRepository", rucRepository);
};
