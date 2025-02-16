import IUser from "../../../src/modules/users/core/entities/IUser";
import { IEditUserAction } from "../../../src/modules/users/core/actions/EditUserAction";
import { IGetAllUsersAction } from "../../../src/modules/users/core/actions/GetAllUsersAction";
import { IGetUserByIdAction } from "../../../src/modules/users/core/actions/GetUserByIdAction";
import { IGetOneUserAction } from "../../../src/modules/users/core/actions/GetOneUserAction";
import { ILoginUserAction } from "../../../src/modules/users/core/actions/LoginUserAction";
import { ISaveUserAction } from "../../../src/modules/users/core/actions/SaveUserAction";

export const userMocked = {
  email: "jhon.doe@mail.com",
  password: "123456",
} as IUser;

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

export const editMockAction = {
  execute: jest.fn().mockResolvedValue(userMocked),
} as IEditUserAction;

export const getAllMockAction = {
  execute: jest.fn().mockResolvedValue(usersListMocked),
} as IGetAllUsersAction;

export const getByIdMockAction = {
  execute: jest.fn().mockResolvedValue(userMocked),
} as IGetUserByIdAction;

export const getOneMockAction = {
  execute: jest.fn().mockResolvedValue(userMocked),
} as IGetOneUserAction;

export const loginMockAction = {
  execute: jest.fn().mockResolvedValue({}),
} as ILoginUserAction;

export const removeMockAction = {
  execute: jest.fn().mockResolvedValue(undefined),
};

export const saveMockAction = {
  execute: jest.fn().mockResolvedValue(userMocked),
} as ISaveUserAction;

