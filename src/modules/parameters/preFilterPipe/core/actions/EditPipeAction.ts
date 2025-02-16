import IPreFilterPipe from "../entities/IPreFilterPipe";
import { IPreFilterPipeRepository } from "../repository/IPreFilterPipeRepository";
import { PipeNotExistException } from "../exceptions/PipeNotExistException";

export interface IEditPipeAction {
  execute: (body: IPreFilterPipe, id: string) => Promise<any>;
}

export const EditPipeAction = (
  PreFilterPipeRepository: IPreFilterPipeRepository,
): IEditPipeAction => {
  return {
    execute(body, id) {
      return new Promise(async (resolve, reject) => {

        try {
    
          const pipe = await PreFilterPipeRepository.getById(id);
          if (!pipe) throw new PipeNotExistException();
    
          await PreFilterPipeRepository.edit(body, id);
          const result = await PreFilterPipeRepository.getById(id);
          
          resolve(result);
        } catch (error) {
          reject(error);
        }
      });
    },
  };
};
