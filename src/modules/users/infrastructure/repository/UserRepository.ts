import { IUserRepository } from "../../core/repository/IUserRepository";
import UserModel from "../models/UserModel";

export const UserRepository = (): IUserRepository => ({
  async save(user) {
    const userCreated = await UserModel.create({
      ...user,
      createdAt: new Date(),
      updatedAt: new Date(),
      status: true,
    });
    return userCreated;
  },
  async edit(user, id) {
    return await UserModel.update(
      { ...user },
      {
        where: {
          id: id,
        },
      }
    );
  },
  async remove(id) {
    return await UserModel.destroy({
      where: {
        id: id,
      },
    });
  },
  async getAll(query) {
    return await UserModel.findAll();
  },
  async getById(id) {
    return await UserModel.findOne({
      where: {
        id: id,
      },
    });
  },
  async getOne(query) {
    const userFounded = await UserModel.findOne({
      where: {
        ...query,
      },
    });
    return userFounded?.dataValues;
  },
});