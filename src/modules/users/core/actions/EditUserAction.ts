import IUser from "../entities/IUser";
import { UserNotExistException } from "../exceptions/UserNotExistException";
import { IUserRepository } from "../repository/IUserRepository";
import { IHashService } from "../services/IHashService";

export interface IEditUserAction {
  execute: (body: IUser, id: string) => Promise<any>;
}
export const EditUserAction = (
  UserRepository: IUserRepository,
  hashService: IHashService
): IEditUserAction => {
  return {
    execute(body, id) {
      return new Promise(async (resolve, reject) => {

        try {
          const { password } = body;
          if (password) {
            body.password = hashService.hash(password);
          }
          const user = await UserRepository.getById(id);
          if (!user) throw new UserNotExistException();
          // if (!isObjectIdOrHexString(id)) throw new InvalidIdException();
          await UserRepository.edit(body, id);
          const result = await UserRepository.getById(id);
          
          resolve(result);
        } catch (error) {
          reject(error);
        }
      });
    },
  };
};
