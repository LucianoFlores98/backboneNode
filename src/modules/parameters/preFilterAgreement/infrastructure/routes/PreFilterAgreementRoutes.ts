import { Router } from "express";
import { DependencyManager } from "../../../../../dependencyManager";
import { getPreFilterAgreementControllers } from "../controllers/controllersProvider";
import { IJwtValidator } from "../../../../../middlewares/JwtValidator/core/IJwtValidator";

const getPreFilterAgreementRoutes = (dependencyManager: DependencyManager) => {
  const jwtValidator = getJwtValidator(dependencyManager);

  const { save, edit, getAll, getById, remove } =
    getPreFilterAgreementControllers(dependencyManager);
  const agreementRouter = Router();
  const path = "agreements";

  agreementRouter.post(`/${path}`, [jwtValidator], save);
  agreementRouter.get(`/${path}`, getAll);
  agreementRouter.get(`/${path}/:id`, getById);
  agreementRouter.patch(`/${path}/:id`, [jwtValidator], edit);
  agreementRouter.delete(`/${path}/:id`, [jwtValidator], remove);
  return agreementRouter;
};

const getJwtValidator = (dependencyManager: DependencyManager) => {
  return dependencyManager.resolve("jwtValidator") as IJwtValidator;
};

export default getPreFilterAgreementRoutes;
