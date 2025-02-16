import { IUserRepository } from "../repository/IUserRepository";
export interface IGetAllUsersAction {
  execute: (query: any) => Promise<any>;
}
export const GetAllUsersAction = (
  UserRepository: IUserRepository
): IGetAllUsersAction => {
  return {
    execute(query) {
      return new Promise(async (resolve, reject) => {
        try {
          const users = await UserRepository.getAll(query);
          resolve(users);
        } catch (error) {
          reject(error);
        }
      });
    },
  };
};
