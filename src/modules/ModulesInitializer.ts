import { DependencyManager } from "../dependencyManager"
import { UserModuleInitializer } from "./users/userModule"
import { PreFilterPipeModuleInitializer } from "./parameters/preFilterPipe/preFilterPipeModule"
import { PreFilterAgeModuleInitializer } from "./parameters/preFilterAge/preFilterAgeModule"
import { PreFilterAgreementModuleInitializer } from "./parameters/preFilterAgreement/preFilterAgreementModule"
import { FileLogModuleInitializer } from "./filesLogs/fileLogModule"
import { PreFilterSegmentModuleInitializer } from "./parameters/preFilterSegment/preFilterSegmentModule"
import { PreFilterTypeOfAgreementModuleInitializer } from "./parameters/preFilterTypesOfAgreements/preFilterTypeOfAgreementModule"
import  { RucModuleInitializer } from "./ruc/rucModule"

const ModulesInitializer = (dependencyManager:DependencyManager) => {
    UserModuleInitializer(dependencyManager)
    PreFilterPipeModuleInitializer(dependencyManager)
    PreFilterAgeModuleInitializer(dependencyManager)
    PreFilterAgreementModuleInitializer(dependencyManager)
    PreFilterSegmentModuleInitializer(dependencyManager)
    FileLogModuleInitializer(dependencyManager)
    RucModuleInitializer(dependencyManager)
    PreFilterTypeOfAgreementModuleInitializer(dependencyManager)
}
export default ModulesInitializer