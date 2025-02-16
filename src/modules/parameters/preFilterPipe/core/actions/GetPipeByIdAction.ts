import { PipeNotExistException } from "../exceptions/PipeNotExistException";
import { IPreFilterPipeRepository } from "../repository/IPreFilterPipeRepository";

export interface IGetPipeByIdAction {
  execute: (id: string) => Promise<any>;
}
export const GetPipeByIdAction = (
  PreFilterPipeRepository: IPreFilterPipeRepository
): IGetPipeByIdAction => {
  return {
    execute(id) {
      return new Promise(async (resolve, reject) => {
        try {
          const pipe = await PreFilterPipeRepository.getById(id);
          if (!pipe) throw new PipeNotExistException();
          resolve(pipe);
        } catch (error) {
          reject(error);
        }
      });
    },
  };
};
