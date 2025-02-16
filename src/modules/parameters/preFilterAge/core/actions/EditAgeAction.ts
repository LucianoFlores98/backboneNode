import { IPreFilterAgeRepository } from "../repository/IPreFilterAgeRepository";
import { AgeNotExistException } from "../exceptions/AgeNotExistException";
import IPreFilterAge from "../entities/IPreFilterAge";

export interface IEditAgeAction {
  execute: (body: IPreFilterAge, id: string) => Promise<IPreFilterAge>;
}

export const EditAgeAction = (
  PreFilterAgeRepository: IPreFilterAgeRepository,
): IEditAgeAction => {
  return {
    execute(body, id) {
      return new Promise(async (resolve, reject) => {
        try {
    
          const age = await PreFilterAgeRepository.getById(id);

          await PreFilterAgeRepository.edit(body, id);
          const result = await PreFilterAgeRepository.getById(id);

          if(!age || !result) throw new AgeNotExistException();

          resolve(result);
        } catch (error) {
          reject(error);
        }
      });
    },
  };
};
