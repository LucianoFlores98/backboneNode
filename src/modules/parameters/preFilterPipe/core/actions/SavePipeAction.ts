import IPreFilterPipe from "../entities/IPreFilterPipe";
import { IPreFilterPipeRepository } from "../repository/IPreFilterPipeRepository";

export interface ISavePipeAction {
  execute: (body: IPreFilterPipe) => Promise<any>;
}

export const SavePipeAction = (
  PreFilterPipeRepository: IPreFilterPipeRepository
): ISavePipeAction => {
  return {
    execute: (body) => {
      return new Promise(async (resolve, reject) => {
        try {
          const result = await PreFilterPipeRepository.save(body);

          resolve(result);
        } catch (error) {
          reject(error);
        }
      });
    },
  };
};
