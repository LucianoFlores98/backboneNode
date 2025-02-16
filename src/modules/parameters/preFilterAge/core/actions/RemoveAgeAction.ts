import { IPreFilterAgeRepository } from "../repository/IPreFilterAgeRepository";
import { AgeNotExistException } from "../exceptions/AgeNotExistException"; 
import IPreFilterAge from "../entities/IPreFilterAge";

export interface IRemoveAgeAction {
  execute: (id: string) => Promise<IPreFilterAge | null>;
}

export const RemoveAgeAction = (
  PreFilterAgeRepository: IPreFilterAgeRepository
): IRemoveAgeAction => {
  return {
    execute(id) {
      return new Promise(async (resolve, reject) => {
        try {
          const age = await PreFilterAgeRepository.getById(id);
          if (!age) throw new AgeNotExistException();
          await PreFilterAgeRepository.remove(id);
          resolve(age);
        } catch (error) {
          reject(error);
        }
      });
    },
  };
};