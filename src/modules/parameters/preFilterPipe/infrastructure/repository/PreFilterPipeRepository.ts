import { Op } from "sequelize";
import IPreFilterPipe from "../../core/entities/IPreFilterPipe";
import { IPreFilterPipeRepository } from "../../core/repository/IPreFilterPipeRepository";
import PipeModel from "../models/PipeModel";

export const PreFilterPipeRepository = (): IPreFilterPipeRepository => ({
  async save(pipe) {
    const orderExist = await PipeModel.findOne({
      where: {
        order: pipe.order,
      },
    });

    if (orderExist) {
      throw new Error(`Ya existe un Parámetro Pipe con el orden: ${pipe.order}`);
    }

    const pipeCreated = await PipeModel.create({
      ...pipe,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return pipeCreated.toJSON() as IPreFilterPipe;
  },

  async edit(pipe, id) {
    const orderExist = await PipeModel.findOne({
      where: {
        order: pipe.order,
        id: {
          [Op.ne]: id,
        },
      },
    });

    if (orderExist) {
      throw new Error(`Ya existe un Parámetro Pipe con el orden: ${pipe.order}`);
    }

    const [affectedCount, updatedPipes] = await PipeModel.update(
      { ...pipe, updatedAt: new Date() },
      {
        where: {
          id: id,
        },
        returning: true,
      }
    );

    if (affectedCount === 0 || !updatedPipes || !updatedPipes[0]) {
      throw new Error("Parámetro Pipe no encontrado");
    }

    return updatedPipes[0].toJSON() as IPreFilterPipe;
  },

  async remove(id) {
    const pipeToDelete = await PipeModel.findOne({ where: { id } });
    if (!pipeToDelete) {
      return null;
    }

    await pipeToDelete.destroy();
    return pipeToDelete.toJSON() as IPreFilterPipe;
  },

  async getAll(query) {
    const pipes = await PipeModel.findAll({ where: query, order: [["order", "ASC"]] });

    return pipes.map((pipe) => pipe.toJSON() as IPreFilterPipe);
  },

  async getById(id) {
    const pipe = await PipeModel.findOne({
      where: {
        id: id,
      },
    });
    return pipe ? (pipe.toJSON() as IPreFilterPipe) : null;
  },
});
