import { Router } from "express";
import { DependencyManager } from "../../../../../dependencyManager";
import { getPreFilterControllers } from "../../infrastructure/controllers/controllersProvider";
import { IJwtValidator } from "../../../../../middlewares/JwtValidator/core/IJwtValidator";

const getPreFilterPipeRoutes = (dependencyManager: DependencyManager) => {
  const jwtValidator = getJwtValidator(dependencyManager);
  const { save, edit, getAll, getById, remove } =
    getPreFilterControllers(dependencyManager);
  const pipeRouter = Router();
  const path = "pipes";

  pipeRouter.post(`/${path}`, [jwtValidator], save);
  pipeRouter.get(`/${path}`, getAll);
  pipeRouter.get(`/${path}/:id`, getById);
  pipeRouter.patch(`/${path}/:id`, [jwtValidator], edit);
  pipeRouter.delete(`/${path}/:id`, [jwtValidator], remove);
  return pipeRouter;
};

const getJwtValidator = (dependencyManager: DependencyManager) => {
  return dependencyManager.resolve("jwtValidator") as IJwtValidator;
};

export default getPreFilterPipeRoutes;
