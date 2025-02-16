import IUser from "../entities/IUser";

export interface IUserRepository {
  save: (user: IUser) => Promise<any>;
  edit: (user: IUser, id: string) => Promise<any>;
  remove: (id: string) => Promise<any>;
  getAll: (query: any) => Promise<any>;
  getOne: (query: any) => Promise<any>;
  getById: (id: string) => Promise<any>;
}
