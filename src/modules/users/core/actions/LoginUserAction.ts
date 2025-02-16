import { IUserRepository } from "../repository/IUserRepository";
import generateJWT from "../../../../helpers/generate-jwt";
import { UserNotExistException } from "../exceptions/UserNotExistException";
import { UserNotActiveException } from "../exceptions/UserNotActiveException";
import { IUserCredential } from "../entities/IUser";
import { IHashService } from "../services/IHashService";
import { WrongPasswordException } from "../exceptions/WrongPasswordException";

export interface ILoginUserAction {
  execute: (credentials: IUserCredential) => Promise<any>;
}

export const LoginUserAction = (
  UserRepository: IUserRepository,
  HashService: IHashService
): ILoginUserAction => {
  return {
    execute(credentials) {
      return new Promise(async (resolve, reject) => {
        try {
          const user = await UserRepository.getOne({
            email: credentials.email,
          });

          if (!user) throw new UserNotExistException();
          if (!user.status) throw new UserNotActiveException();

          const isPasswordValid = HashService.compare(
            credentials.password || "",
            user.password
          );

          if (!isPasswordValid) throw new WrongPasswordException();

          const token = await generateJWT(user.id);
          resolve({
            user,
            token,
          });
        } catch (error) {
          reject(error);
        }
      });
    },
  };
};
