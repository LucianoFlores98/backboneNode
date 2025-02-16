import { Router } from "express";
import { DependencyManager } from "../../../../dependencyManager";
import { getRucControllers } from "../controllers/controllersProvider";

const getRucRoutes = (dependencyManager: DependencyManager) => {
    const { save, getAll } =
        getRucControllers(dependencyManager);
    const rucRouter = Router();
    const path = "ruc";

    rucRouter.post(`/${path}`, save);
    rucRouter.get(`/${path}`, getAll);
    return rucRouter;
};

export default getRucRoutes;
