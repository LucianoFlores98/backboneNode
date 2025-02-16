import { IUserRepository } from "../../../../../src/modules/users/core/repository/IUserRepository";
import { GetUserByIdAction } from '../../../../../src/modules/users/core/actions/GetUserByIdAction';
import { userMocked } from "./mocksAction";

describe("GetUserByIdAction", () => {

    let userRepositoryMocked: IUserRepository;

    beforeEach(() => {
        // Mock del repositorio de usuarios
        userRepositoryMocked = {
          getById: jest.fn(),
          remove: jest.fn(),
          save: jest.fn(),
          edit: jest.fn(),
          getAll: jest.fn(),
          getOne: jest.fn(),
        } as unknown as IUserRepository;
      });
  
    it("Should retrieve user successfully by ID", async () => {
      // Simular el retorno de un usuario desde el repositorio
      (userRepositoryMocked.getById as jest.Mock).mockResolvedValue(userMocked);
  
      const getUserByIdAction = GetUserByIdAction(userRepositoryMocked);
  
      const id = "1"; // ID del usuario que estamos buscando
      const result = await getUserByIdAction.execute(id);
  
      expect(userRepositoryMocked.getById).toHaveBeenCalledWith(id);
      expect(result).toEqual(userMocked); // Verifica que el resultado sea el esperado
    });
  
    it("Should throw an error if the repository throws an error when retrieving user by ID", async () => {
      // Simular que el repositorio lanza un error
      const error = new Error("Database error");
      (userRepositoryMocked.getById as jest.Mock).mockRejectedValue(error);
  
      const getUserByIdAction = GetUserByIdAction(userRepositoryMocked);
  
      const id = "1"; // ID del usuario que estamos buscando
      await expect(getUserByIdAction.execute(id)).rejects.toThrow("Database error");
  
      expect(userRepositoryMocked.getById).toHaveBeenCalledWith(id);
    });
  
    it("Should throw UserNotExistException if no user is found by the given ID", async () => {
      // Simular que no se encuentra el usuario
      (userRepositoryMocked.getById as jest.Mock).mockResolvedValue(null);
    
      const getUserByIdAction = GetUserByIdAction(userRepositoryMocked);
    
      const id = "999"; // ID inexistente
      await expect(getUserByIdAction.execute(id)).rejects.toThrow("Usuario inexistente"); // Verifica el mensaje de error
    
      expect(userRepositoryMocked.getById).toHaveBeenCalledWith(id);
    });
  });