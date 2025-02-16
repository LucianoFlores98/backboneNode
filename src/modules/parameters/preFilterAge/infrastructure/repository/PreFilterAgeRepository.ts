import IPreFilterAge from "../../core/entities/IPreFilterAge";
import { IPreFilterAgeRepository } from "../../core/repository/IPreFilterAgeRepository";
import AgeModel from "../models/AgeModel";

export const PreFilterAgeRepository = (): IPreFilterAgeRepository => ({
  async save(age) {
    const AgeCreated = await AgeModel.create({
      ...age,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return AgeCreated.toJSON() as IPreFilterAge;
  },

  async edit(age, id) {
    const [affectedCount, updatedAges] = await AgeModel.update(
      { ...age, updatedAt: new Date() },
      {
        where: {
          id: id,
        },
        returning: true,
      }
    );

    if (affectedCount === 0 || !updatedAges || !updatedAges[0]) {
      throw new Error("Age not found or not updated");
    }

    return updatedAges[0].toJSON() as IPreFilterAge;
  },

  async remove(id) {
    const ageToDelete = await AgeModel.findOne({ where: { id } });
    if (!ageToDelete) {
      return null;
    }

    await ageToDelete.destroy();
    return ageToDelete.toJSON() as IPreFilterAge;
  },

  async getAll(query) {
    const ages = await AgeModel.findAll({
      where: query,
      order: [
        ["createdAt", "ASC"],
        ["id", "ASC"],
      ],
    });

    return ages.map((age) => age.toJSON() as IPreFilterAge);
  },

  async getById(id) {
    const age = await AgeModel.findOne({
      where: {
        id: id,
      },
    });
    return age ? (age.toJSON() as IPreFilterAge) : null;
  },
});
