import { IPreFilterPipeRepository } from "../repository/IPreFilterPipeRepository";

export interface IGetAllPipeAction {
  execute: (query: any) => Promise<any>;
}
export const GetAllPipesAction = (
  PreFilterPipeRepository: IPreFilterPipeRepository
): IGetAllPipeAction => {
  return {
    execute(query) {
      return new Promise(async (resolve, reject) => {
        try {
          const pipes = await PreFilterPipeRepository.getAll(query);
          resolve(pipes);
        } catch (error) {
          reject(error);
        }
      });
    },
  };
};
