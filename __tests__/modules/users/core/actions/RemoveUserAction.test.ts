import { IUserRepository } from "../../../../../src/modules/users/core/repository/IUserRepository";
import { RemoveUserAction } from '../../../../../src/modules/users/core/actions/RemoveUserAction';
import { userMocked } from "./mocksAction";
import { UserNotExistException } from "../../../../../src/modules/users/core/exceptions/UserNotExistException";

describe("RemoveUserAction", () => {
    let userRepositoryMocked: IUserRepository;
  
    beforeEach(() => {
      // Mock del repositorio de usuarios
      userRepositoryMocked = {
        getById: jest.fn(),
        remove: jest.fn().mockResolvedValue(userMocked),
        save: jest.fn(),
        edit: jest.fn(),
        getAll: jest.fn(),
        getOne: jest.fn(),
      } as unknown as IUserRepository;
    });
  
    it("Should remove user successfully if user exists", async () => {
      // Simular que el usuario existe
      (userRepositoryMocked.getById as jest.Mock).mockResolvedValue(userMocked);
  
      const removeUserAction = RemoveUserAction(userRepositoryMocked);
  
      // Ejecutar la acción con un ID de usuario válido
      const result = await removeUserAction.execute("validUserId");
  
      expect(userRepositoryMocked.getById).toHaveBeenCalledWith("validUserId");
      expect(userRepositoryMocked.remove).toHaveBeenCalledWith("validUserId");
      expect(result).toEqual(userMocked); // Se espera que el resultado sea el usuario eliminado
    });
  
    it("Should throw UserNotExistException if the user does not exist", async () => {
        // Simular que el usuario no existe
        (userRepositoryMocked.getById as jest.Mock).mockResolvedValue(undefined);
      
        const removeUserAction = RemoveUserAction(userRepositoryMocked);
      
        await expect(removeUserAction.execute("nonExistentUserId"))
          .rejects
          .toThrowError(new UserNotExistException()); // Verifica tanto el tipo como el mensaje por defecto
      
        expect(userRepositoryMocked.getById).toHaveBeenCalledWith("nonExistentUserId");
        expect(userRepositoryMocked.remove).not.toHaveBeenCalled();
    });
  
    it("Should throw an error if the repository throws an error during removal", async () => {
      // Simular que el usuario existe
      (userRepositoryMocked.getById as jest.Mock).mockResolvedValue(userMocked);
  
      // Simular un error en el método remove
      (userRepositoryMocked.remove as jest.Mock).mockRejectedValue(new Error("Error removing user"));
  
      const removeUserAction = RemoveUserAction(userRepositoryMocked);
  
      await expect(removeUserAction.execute("validUserId"))
        .rejects
        .toThrow("Error removing user");
  
      expect(userRepositoryMocked.getById).toHaveBeenCalledWith("validUserId");
      expect(userRepositoryMocked.remove).toHaveBeenCalledWith("validUserId");
    });
  });