import { Op } from "sequelize";
import IPreFilterAgreement from "../../core/entities/IPreFilterAgreement";
import { IPreFilterAgreementRepository } from "../../core/repository/IPreFilterAgreementRepository";
import Agreements from "../models/AgreementModel";

export const PreFilterAgreementRepository =
  (): IPreFilterAgreementRepository => ({
    async save(agreement) {
      const numberAgreementExist = await Agreements.findOne({
        where: {
          number: agreement.number,
        },
      });

      if (numberAgreementExist) {
        throw new Error(
          `El convenio con el número ${agreement.number} ya existe`
        );
      }

      const agreementCreated = await Agreements.create({
        ...agreement,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      return agreementCreated.toJSON() as IPreFilterAgreement;
    },

    async edit(agreement, id) {
      const agreementExist = await Agreements.findOne({
        where: {
          number: agreement.number,
          id: {
            [Op.not]: id,
          },
        },
      });

      if (agreementExist) {
        throw new Error(
          `El convenio con el número ${agreement.number} ya existe`
        );
      }

      const [affectedCount, updatedAgreements] = await Agreements.update(
        { ...agreement, updatedAt: new Date() },
        {
          where: {
            id: id,
          },
          returning: true,
        }
      );

      if (affectedCount === 0 || !updatedAgreements || !updatedAgreements[0]) {
        throw new Error("Agreement not found or not updated");
      }

      return updatedAgreements[0].toJSON() as IPreFilterAgreement;
    },

    async remove(id) {
      const agreementToDelete = await Agreements.findOne({ where: { id } });
      if (!agreementToDelete) {
        return null;
      }

      await agreementToDelete.destroy();
      return agreementToDelete.toJSON() as IPreFilterAgreement;
    },

    async getAll(query) {
      const agreements = await Agreements.findAll({
        where: query,
        order: [
          ["createdAt", "ASC"],
          ["id", "ASC"],
        ],
      });

      return agreements.map(
        (agreement) => agreement.toJSON() as IPreFilterAgreement
      );
    },

    async getById(id) {
      const agreement = await Agreements.findOne({
        where: {
          id: id,
        },
      });
      return agreement ? (agreement.toJSON() as IPreFilterAgreement) : null;
    },
  });
