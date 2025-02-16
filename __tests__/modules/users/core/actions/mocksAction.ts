import IUser, { IUserCredential } from "../../../../../src/modules/users/core/entities/IUser";

export const userMocked = {
    email: "jhon.doe@mail.com",
    password: "hashedPassword123",
    status: true,
} as IUser;

export const credentialsMocked = {
    email: "test@example.com",
    password: "password123",
} as IUserCredential; 

export const usersListMocked = [
    {
      id: "1",
      name: "jhon.doe",
      email: "jhon.doe@mail.com",
      password: "123456",
      status: true,
      role: "2",
    },
    {
      id: "2",
      name: "jane.doe",
      email: "jane.doe@mail.com",
      password: "123456",
      status: true,
      role: "1",
    },
  ] as IUser[];