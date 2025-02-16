import { Router } from "express";
import { DependencyManager } from "../../../../../dependencyManager";
import { getPreFilterSegmentControllers } from "../controllers/controllersProvider";
import { IJwtValidator } from "../../../../../middlewares/JwtValidator/core/IJwtValidator";

const getPreFilterSegmentRoutes = (dependencyManager: DependencyManager) => {
  const jwtValidator = getJwtValidator(dependencyManager);

  const { save, edit, getAll, getById, remove } =
    getPreFilterSegmentControllers(dependencyManager);
  const segmentRouter = Router();
  const path = "segments";

  segmentRouter.post(`/${path}`, [jwtValidator], save);
  segmentRouter.get(`/${path}`, getAll);
  segmentRouter.get(`/${path}/:id`, getById);
  segmentRouter.patch(`/${path}/:id`, [jwtValidator], edit);
  segmentRouter.delete(`/${path}/:id`, [jwtValidator], remove);
  return segmentRouter;
};

const getJwtValidator = (dependencyManager: DependencyManager) => {
  return dependencyManager.resolve("jwtValidator") as IJwtValidator;
};

export default getPreFilterSegmentRoutes;
