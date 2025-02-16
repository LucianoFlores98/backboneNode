import { EditUserAction } from "../../../../../src/modules/users/core/actions/EditUserAction";
import { IUserRepository } from "../../../../../src/modules/users/core/repository/IUserRepository";
import { IHashService } from "../../../../../src/modules/users/core/services/IHashService";
import { userMocked } from "./mocksAction";

describe("EditUserAction", () => {
    let userRepositoryMocked: IUserRepository;
    let hashServiceMocked: IHashService;
  
    beforeEach(() => {
      userRepositoryMocked = {
        save: jest.fn(),
        edit: jest.fn(),
        remove: jest.fn(),
        getAll: jest.fn(),
        getById: jest.fn().mockResolvedValue(userMocked),
        getOne: jest.fn(),
      } as IUserRepository;
  
      hashServiceMocked = {
        hash: jest.fn().mockReturnValue("hashedPassword"),
        compare: jest.fn(),
      } as IHashService;
    });
  
    it("Should edit user successfully without changing password", async () => {
      const editUserAction = EditUserAction(userRepositoryMocked, hashServiceMocked);
  
      const body = userMocked;
  
      const result = await editUserAction.execute(body, userMocked.id);
  
      expect(userRepositoryMocked.edit).toHaveBeenCalledWith(body, userMocked.id);
      expect(userRepositoryMocked.getById).toHaveBeenCalledWith(userMocked.id);
      expect(result).toEqual(userMocked);
    });
  
    it("Should edit user and hash the password when a new password is provided", async () => {
      const editUserAction = EditUserAction(userRepositoryMocked, hashServiceMocked);
  
      const body = { ...userMocked, password: "newPassword" }; // Usuario con nueva contraseña
  
      const result = await editUserAction.execute(body, userMocked.id);
  
      expect(hashServiceMocked.hash).toHaveBeenCalledWith("newPassword");
      expect(userRepositoryMocked.edit).toHaveBeenCalledWith(
        { ...body, password: "hashedPassword" },
        userMocked.id
      );
      expect(userRepositoryMocked.getById).toHaveBeenCalledWith(userMocked.id);
      expect(result).toEqual(userMocked);
    });
  
    it("Should throw an error if repository throws an error during editing", async () => {
      userRepositoryMocked.edit = jest.fn().mockRejectedValue(new Error("Error al editar usuario"));
  
      const editUserAction = EditUserAction(userRepositoryMocked, hashServiceMocked);
  
      await expect(editUserAction.execute(userMocked, userMocked.id)).rejects.toThrow(
        "Error al editar usuario"
      );
      expect(userRepositoryMocked.edit).toHaveBeenCalledWith(userMocked, userMocked.id);
    });
  
    it("Should throw an error if repository throws an error during fetching the user", async () => {
      // Simular un error al intentar obtener el usuario
      userRepositoryMocked.getById = jest.fn().mockRejectedValue(new Error("Error al obtener usuario"));
    
      const editUserAction = EditUserAction(userRepositoryMocked, hashServiceMocked);
    
      await expect(editUserAction.execute(userMocked, userMocked.id)).rejects.toThrow("Error al obtener usuario");
      
      expect(userRepositoryMocked.getById).toHaveBeenCalledWith(userMocked.id);
      expect(userRepositoryMocked.edit).not.toHaveBeenCalled(); // Cambia esto a no haber sido llamado
    });


    it("Should throw UserNotExistException if no user is found by the given ID", async () => {
      // Simular que no se encuentra el usuario
      (userRepositoryMocked.getById as jest.Mock).mockResolvedValue(null);
      
      const getUserByIdAction = EditUserAction(userRepositoryMocked, hashServiceMocked);
      
      const id = "999"; // ID inexistente
      await expect(getUserByIdAction.execute(userMocked, id)).rejects.toThrow("Usuario inexistente"); // Verifica el mensaje de error
    
      expect(userRepositoryMocked.getById).toHaveBeenCalledWith(id);
      expect(userRepositoryMocked.edit).not.toHaveBeenCalled(); // Asegúrate de que edit no fue llamado
    });
  });