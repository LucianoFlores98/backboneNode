import { IUserRepository } from "../../../../../src/modules/users/core/repository/IUserRepository";
import { userMocked } from "./mocksAction";
import { GetOneUserAction } from '../../../../../src/modules/users/core/actions/GetOneUserAction';

describe("GetOneUserAction", () => {

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
  
    it("Should retrieve one user successfully", async () => {
      // Simular el retorno de un usuario desde el repositorio
      (userRepositoryMocked.getOne as jest.Mock).mockResolvedValue(userMocked);
  
      const getOneUserAction = GetOneUserAction(userRepositoryMocked);
  
      const query = "1"; // El id o query que se necesite
      const result = await getOneUserAction.execute(query);
  
      expect(userRepositoryMocked.getOne).toHaveBeenCalledWith(query);
      expect(result).toEqual(userMocked); // Verifica que el resultado sea el esperado
    });
  
    it("Should throw an error if the repository throws an error", async () => {
      // Simular que el repositorio lanza un error
      const error = new Error("Database error");
      (userRepositoryMocked.getOne as jest.Mock).mockRejectedValue(error);
  
      const getOneUserAction = GetOneUserAction(userRepositoryMocked);
  
      const query = "1"; // El id o query que se necesite
      await expect(getOneUserAction.execute(query)).rejects.toThrow("Database error");
  
      expect(userRepositoryMocked.getOne).toHaveBeenCalledWith(query);
    });
  });