import { Router } from "express";
import { DependencyManager } from "../../../../../dependencyManager";
import { getPreFilterTypeOfAgreementControllers } from "../controllers/controllersProvider";
import { IJwtValidator } from "../../../../../middlewares/JwtValidator/core/IJwtValidator";

const getPreFilterTypeOfAgreementRoutes = (
  dependencyManager: DependencyManager
) => {
  const jwtValidator = getJwtValidator(dependencyManager);
  const { save, edit, getAll, getById, remove } =
    getPreFilterTypeOfAgreementControllers(dependencyManager);
  const typeAgreementRouter = Router();
  const path = "types-of-agreements";

  typeAgreementRouter.post(`/${path}`, [jwtValidator], save);
  typeAgreementRouter.get(`/${path}`, getAll);
  typeAgreementRouter.get(`/${path}/:id`, getById);
  typeAgreementRouter.patch(`/${path}/:id`, [jwtValidator], edit);
  typeAgreementRouter.delete(`/${path}/:id`, [jwtValidator], remove);
  return typeAgreementRouter;
};

const getJwtValidator = (dependencyManager: DependencyManager) => {
  return dependencyManager.resolve("jwtValidator") as IJwtValidator;
};

export default getPreFilterTypeOfAgreementRoutes;
