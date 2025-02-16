import { Router } from "express";
import { DependencyManager } from "../../../../../dependencyManager";
import { getPreFilterAgeControllers } from "../controllers/controllersProvider";
import { IJwtValidator } from '../../../../../middlewares/JwtValidator/core/IJwtValidator';

const getPreFilterAgeRoutes = (dependencyManager: DependencyManager) => {
  const jwtValidator = getJwtValidator(dependencyManager);
  const { save, edit, getAll, getById, remove } =
    getPreFilterAgeControllers(dependencyManager);
  const ageRouter = Router();
  const path = "ages";

  ageRouter.post(`/${path}`,[jwtValidator], save);
  ageRouter.get(`/${path}`, getAll);
  ageRouter.get(`/${path}/:id`, getById);
  ageRouter.patch(`/${path}/:id`,[jwtValidator], edit);
  ageRouter.delete(`/${path}/:id`,[jwtValidator], remove);
  return ageRouter;
};

const getJwtValidator = (dependencyManager: DependencyManager) => {
  return dependencyManager.resolve("jwtValidator") as IJwtValidator;
};

export default getPreFilterAgeRoutes;
