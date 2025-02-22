import { DependencyManager } from "../dependencyManager"
import { UserModuleInitializer } from "./users/userModule"

const ModulesInitializer = (dependencyManager:DependencyManager) => {
    UserModuleInitializer(dependencyManager)
}
export default ModulesInitializer