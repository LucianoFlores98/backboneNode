import { DependencyManager } from "../../../../dependencyManager";
import { getUserActions } from "../../core/actions/actionsProvider";
import { IUserRepository } from "../../core/repository/IUserRepository";
import { IHashService } from "../../core/services/IHashService";
import { UserControllers } from "./UserControllers";

// Debemos registrar todos los controladores, servicios, acciones y repositorios que estemos utilizando en este modulo
export const getUserControllers = (dependencyManager: DependencyManager) => {
  const UserRepository = getUserRepository(dependencyManager);
  const hashService = getHashService(dependencyManager);
  const UserActions = getUserActions(UserRepository, hashService);
  return UserControllers(UserActions);
};

const getUserRepository = (dependencyManager: DependencyManager) => {
  return dependencyManager.resolve("userRepository") as IUserRepository;
};
const getHashService = (dependencyManager: DependencyManager) => {
  return dependencyManager.resolve("hashService") as IHashService;
};
