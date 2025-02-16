import { LoginUserAction } from "../../../../../src/modules/users/core/actions/LoginUserAction";
import { credentialsMocked, userMocked } from "./mocksAction";
import { IUserRepository } from "../../../../../src/modules/users/core/repository/IUserRepository";
import { WrongUidCredentialsException } from "../../../../../src/modules/users/core/exceptions/WrongUidCredentialsException";
import generateJWT from "../../../../../src/helpers/generate-jwt";

// Mock del JWT
jest.mock("../../../../../src/helpers/generate-jwt", () => jest.fn(() => "testToken"));

describe("LoginUserAction", () => {

  it("Should login successfully with valid credentials", async () => {
    const tokenMocked = "testToken";

    const userRepositoryMocked = {
      save: jest.fn(),
      edit: jest.fn(),
      remove: jest.fn(),
      getAll: jest.fn(),
      getById: jest.fn(),
      getOne: jest.fn().mockResolvedValue(userMocked), // El usuario existe
    } as IUserRepository;

    const loginUserAction = LoginUserAction(userRepositoryMocked);

    const result = await loginUserAction.execute(credentialsMocked);

    expect(userRepositoryMocked.getOne).toHaveBeenCalledWith({ email: credentialsMocked.email });
    expect(result).toEqual({ user: userMocked, token: tokenMocked });
    expect(generateJWT).toHaveBeenCalledWith(userMocked.id);
  });


  it("Should throw UserNotExistException if the user does not exist", async () => {
    const userRepositoryMocked = {
      save: jest.fn(),
      edit: jest.fn(),
      remove: jest.fn(),
      getAll: jest.fn(),
      getById: jest.fn(),
      getOne: jest.fn().mockResolvedValue(undefined), // Simula que el usuario no existe
    } as IUserRepository;

    const loginUserAction = await LoginUserAction(userRepositoryMocked);

    await expect(loginUserAction.execute(credentialsMocked)).rejects.toThrow("Usuario inexistente");
  });

  it("Should throw UserNotActiveException if the user is inactive", async () => {
    const inactiveUserMocked = { ...userMocked, status: false }; // Usuario inactivo

    const userRepositoryMocked = {
      save: jest.fn(),
      edit: jest.fn(),
      remove: jest.fn(),
      getAll: jest.fn(),
      getById: jest.fn(),
      getOne: jest.fn().mockResolvedValue(inactiveUserMocked), // Simula un usuario inactivo
    } as IUserRepository;

    const loginUserAction = await LoginUserAction(userRepositoryMocked);

    await expect(loginUserAction.execute(credentialsMocked)).rejects.toThrow("El usuario se encuentra desactivado");
  });
});
