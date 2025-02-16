import { IUserRepository } from "../../../../../src/modules/users/core/repository/IUserRepository";
import { GetAllUsersAction } from '../../../../../src/modules/users/core/actions/GetAllUsersAction';
import { usersListMocked } from "./mocksAction";

describe("GetAllUsersAction", () => {

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
  
    it("Should retrieve all users successfully", async () => {
      // Simular el retorno de usuarios desde el repositorio
      (userRepositoryMocked.getAll as jest.Mock).mockResolvedValue(usersListMocked);
  
      const getAllUsersAction = GetAllUsersAction(userRepositoryMocked);
  
      const query = {}; // Define un query si lo necesitas
      const result = await getAllUsersAction.execute(query);
  
      expect(userRepositoryMocked.getAll).toHaveBeenCalledWith(query);
      expect(result).toEqual(usersListMocked); // Verifica que el resultado sea el esperado
    });
  
    it("Should throw an error if the repository throws an error", async () => {
      // Simular que el repositorio lanza un error
      const error = new Error("Database error");
      (userRepositoryMocked.getAll as jest.Mock).mockRejectedValue(error);
  
      const getAllUsersAction = GetAllUsersAction(userRepositoryMocked);
  
      const query = {}; // Define un query si lo necesitas
      await expect(getAllUsersAction.execute(query)).rejects.toThrow("Database error");
  
      expect(userRepositoryMocked.getAll).toHaveBeenCalledWith(query);
    });
  });