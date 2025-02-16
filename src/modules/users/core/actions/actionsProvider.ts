import { IUserRepository } from "../repository/IUserRepository";
import { IHashService } from "../services/IHashService";
import { EditUserAction, IEditUserAction } from "./EditUserAction";
import { GetAllUsersAction, IGetAllUsersAction } from "./GetAllUsersAction";
import { IGetOneUserAction, GetOneUserAction} from "./GetOneUserAction";
import { GetUserByIdAction, IGetUserByIdAction } from "./GetUserByIdAction";
import { ILoginUserAction, LoginUserAction } from "./LoginUserAction";
import { IRemoveUserAction, RemoveUserAction } from "./RemoveUserAction";
import { ISaveUserAction, SaveUserAction } from "./SaveUserAction";
export interface IUserActions {
  save: ISaveUserAction;
  edit: IEditUserAction;
  remove: IRemoveUserAction;
  getAll: IGetAllUsersAction;
  getById: IGetUserByIdAction;
  login: ILoginUserAction;
  getOne: IGetOneUserAction
}
export const getUserActions = (
  UserRepository: IUserRepository,
  hashService: IHashService
) => {
  const UserActions: IUserActions = {
    save: SaveUserAction(UserRepository, hashService),
    edit: EditUserAction(UserRepository, hashService),
    remove: RemoveUserAction(UserRepository),
    getAll: GetAllUsersAction(UserRepository),
    getById: GetUserByIdAction(UserRepository),
    getOne: GetOneUserAction(UserRepository),
    login: LoginUserAction(UserRepository, hashService),
  };
  return UserActions;
};
