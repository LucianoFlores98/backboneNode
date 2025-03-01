import { DependencyManager } from "../dependencyManager"
import { UserModuleInitializer } from "./users/userModule"

// Aca debemos registrar todos los modulos que hayamos creado
const ModulesInitializer = (dependencyManager:DependencyManager) => {
    UserModuleInitializer(dependencyManager)
}
export default ModulesInitializer