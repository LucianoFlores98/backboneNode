import { DependencyManager } from "../../dependencyManager";
import { UserRepository } from "./infrastructure/repository/UserRepository";
import { BcryptHashService } from "./infrastructure/services/BcryptHashService";

export const UserModuleInitializer = (dependencyManager: DependencyManager) => {
  const userRepository = UserRepository();
  const hashService = BcryptHashService();
  dependencyManager.register("userRepository", userRepository);
  dependencyManager.register("hashService", hashService);
};
