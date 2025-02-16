import { DependencyManager } from "../../../src/dependencyManager";
import { UserRepository } from "../../../src/modules/users/infrastructure/repository/UserRepository";
import { BcryptHashService } from "../../../src/modules/users/infrastructure/services/BcryptHashService";
import { UserModuleInitializer } from "../../../src/modules/users/userModule";

describe("User Module register", () => {
  it("should register UserRepository and BCryptHashService", () => {
    const dependencyManager = new DependencyManager();
    const registerSpy = jest.spyOn(dependencyManager, "register");

    UserModuleInitializer(dependencyManager);

    expect(registerSpy).toHaveBeenCalledWith(
      "userRepository",
      expect.anything()
    );
    expect(registerSpy).toHaveBeenCalledWith("hashService", expect.anything());
  });

  it("should throw error when register an existing key dependency", () => {
    const dependencyManager = new DependencyManager();
    const userRepository = UserRepository();
    const hashService = BcryptHashService();

    dependencyManager.register("userRepository", userRepository);
    dependencyManager.register("hashService", hashService);

    expect(() => UserModuleInitializer(dependencyManager)).toThrow(
      "Dependency key already registered: userRepository"
    );
  });
});
