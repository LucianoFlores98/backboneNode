import { IUserRepository } from "../repository/IUserRepository";
export interface IGetOneUserAction {
  execute: (query: string) => Promise<any>;
}
export const GetOneUserAction = (
  UserRepository: IUserRepository
): IGetOneUserAction => {
  return {
    execute(query) {
      return new Promise(async (resolve, reject) => {
        try {
          const user = await UserRepository.getOne(query);
          resolve(user);
        } catch (error) {
          reject(error);
        }
      });
    },
  };
};
