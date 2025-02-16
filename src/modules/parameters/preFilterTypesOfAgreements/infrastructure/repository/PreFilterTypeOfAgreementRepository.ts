import IPreFilterTypeOfAgreements from "../../core/entities/IPreFilterTypesOfAgreements";
import { IPreFilterTypesOfAgreementRepository } from "../../core/repository/IPreFilterTypesOfAgreementsRepository";
import TypesAgreements from "../models/TypeAgreementModel";

export const PreFilterTypeOfAgreementRepository =
  (): IPreFilterTypesOfAgreementRepository => ({
    async save(type) {
      const TypeCreated = await TypesAgreements.create({
        ...type,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      return TypeCreated.toJSON() as IPreFilterTypeOfAgreements;
    },

    async edit(type, id) {
      const [affectedCount, updatedTypes] = await TypesAgreements.update(
        { ...type, updatedAt: new Date() },
        {
          where: {
            id: id,
          },
          returning: true,
        }
      );

      if (affectedCount === 0 || !updatedTypes || !updatedTypes[0]) {
        throw new Error("Tipo de convenio no encontrado");
      }

      return updatedTypes[0].toJSON() as IPreFilterTypeOfAgreements;
    },

    async remove(id) {
      const typeToDelete = await TypesAgreements.findOne({ where: { id } });
      if (!typeToDelete) {
        return null;
      }

      await typeToDelete.destroy();
      return typeToDelete.toJSON() as IPreFilterTypeOfAgreements;
    },

    async getAll(query) {
      const types = await TypesAgreements.findAll({
        where: query,
        order: [
          ["createdAt", "ASC"],
          ["id", "ASC"],
        ],
      });

      return types.map((type) => type.toJSON() as IPreFilterTypeOfAgreements);
    },

    async getById(id) {
      const type = await TypesAgreements.findOne({
        where: {
          id: id,
        },
      });
      return type ? (type.toJSON() as IPreFilterTypeOfAgreements) : null;
    },
  });
