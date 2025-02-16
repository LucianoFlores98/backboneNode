import { IUserRepository } from "../../../../../src/modules/users/core/repository/IUserRepository";
import { IHashService } from "../../../../../src/modules/users/core/services/IHashService";
import { SaveUserAction } from '../../../../../src/modules/users/core/actions/SaveUserAction';
import { userMocked } from "./mocksAction";

describe("SaveUserAction", () => {
    let userRepositoryMocked: IUserRepository;
    let hashServiceMocked: IHashService;
  
    beforeEach(() => {
      userRepositoryMocked = {
        save: jest.fn().mockResolvedValue(userMocked),
        edit: jest.fn(),
        remove: jest.fn(),
        getAll: jest.fn(),
        getById: jest.fn(),
        getOne: jest.fn(),
      } as IUserRepository;
  
      hashServiceMocked = {
        hash: jest.fn().mockReturnValue("hashedPassword"),
        compare: jest.fn(),
      } as IHashService;
    });
  
    it("Should save user successfully with hashed password", async () => {

      const saveUserAction = SaveUserAction(userRepositoryMocked, hashServiceMocked);
      
      const body = { ...userMocked, password: "plainPassword" }; // Contraseña en texto plano
      
      const result = await saveUserAction.execute(body);
      
      expect(hashServiceMocked.hash).toHaveBeenCalledWith("plainPassword");
      expect(userRepositoryMocked.save).toHaveBeenCalledWith({
        ...body,
        password: "hashedPassword", // Asegúrate de que la contraseña se guarda como hasheada
      });
      expect(result).toEqual(userMocked); // Ajusta esto según el resultado esperado
    });
  
    it("Should throw an error if repository throws an error during saving", async () => {
      userRepositoryMocked.save = jest.fn().mockRejectedValue(new Error("Error al guardar el usuario"));
  
      const saveUserAction = SaveUserAction(userRepositoryMocked, hashServiceMocked);
  
      await expect(saveUserAction.execute(userMocked)).rejects.toThrow("Error al guardar el usuario");
      expect(userRepositoryMocked.save).toHaveBeenCalledWith({
        ...userMocked,
        password: hashServiceMocked.hash(userMocked.password), // Asegúrate de que se llama a hash
      });
    });
  });