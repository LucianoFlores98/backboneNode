import { DependencyManager } from "../dependencyManager"
import getUserRoutes from "../modules/users/infrastructure/routes/UserRoutes"
import getFileLogRoutes from "../modules/filesLogs/infrastructure/routes/FileLogRoutes";
import getPreFilterPipeRoutes from "../modules/parameters/preFilterPipe/infrastructure/routes/PreFilterPipeRoutes"
import getPreFilterAgeRoutes from "../modules/parameters/preFilterAge/infrastructure/routes/PreFilterAgeRoutes"
import getPreFilterAgreementRoutes from "../modules/parameters/preFilterAgreement/infrastructure/routes/PreFilterAgreementRoutes"
import getPreFilterSegmentRoutes from "../modules/parameters/preFilterSegment/infrastructure/routes/PreFilterSegmentRoutes";
import getRucRoutes from "../modules/ruc/infrastructure/routes/RucRoutes";
import getPreFilterTypeOfAgreementRoutes from "../modules/parameters/preFilterTypesOfAgreements/infrastructure/routes/PreFilterTypeOfAgreementRoutes";
const prefix = '/api/v1'
const ReduceRouters = (app: { use: (arg0: string, arg1: any) => void }, dependencyManager: DependencyManager) => {
    app.use(prefix, getUserRoutes(dependencyManager))
    app.use(prefix, getPreFilterPipeRoutes(dependencyManager))
    app.use(prefix, getPreFilterAgeRoutes(dependencyManager))
    app.use(prefix, getPreFilterAgreementRoutes(dependencyManager))
    app.use(prefix, getPreFilterSegmentRoutes(dependencyManager))
    app.use(prefix, getFileLogRoutes(dependencyManager));
    app.use(prefix, getRucRoutes(dependencyManager));
    app.use(prefix, getPreFilterTypeOfAgreementRoutes(dependencyManager));
}

export default ReduceRouters