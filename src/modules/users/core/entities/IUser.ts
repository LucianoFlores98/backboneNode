export default interface IUser {
  name: string;
  email: string;
  password: string;
  id: string;
  createdAt: Date;
  updatedAt: Date;
  role: string;
  status: boolean;
}

export type IUserCredential = Partial<Pick<IUser, "id" | "email" | "password">>