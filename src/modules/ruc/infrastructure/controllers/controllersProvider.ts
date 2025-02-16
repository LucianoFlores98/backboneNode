import { DependencyManager } from "../../../../dependencyManager";
import { getRucActions } from "../../core/actions/actionsProvider";
import { IRucRepository } from "../../core/repository/IRucRepository";
import { RucControllers } from "./RucControllers";

export const getRucControllers = (dependencyManager: DependencyManager) => {
    const rucRepository = getRucRepository(dependencyManager);
    const rucActions = getRucActions(rucRepository);
    return RucControllers(rucActions);
};

const getRucRepository = (dependencyManager: DependencyManager) => {
    return dependencyManager.resolve("rucRepository") as IRucRepository;
};