import { IPreFilterPipeRepository } from "../repository/IPreFilterPipeRepository";
import { PipeNotExistException } from "../exceptions/PipeNotExistException";

export interface IRemovePipeAction {
  execute: (id: string) => Promise<any>;
}

export const RemovePipeAction = (
  PreFilterPipeRepository: IPreFilterPipeRepository
): IRemovePipeAction => {
  return {
    execute(id) {
      return new Promise(async (resolve, reject) => {
        try {
          const pipe = await PreFilterPipeRepository.getById(id);
          if (!pipe) throw new PipeNotExistException();
          await PreFilterPipeRepository.remove(id);
          resolve(pipe);
        } catch (error) {
          reject(error);
        }
      });
    },
  };
};