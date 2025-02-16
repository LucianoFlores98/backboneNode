import { AgeNotExistException } from "../exceptions/AgeNotExistException";
import { IPreFilterAgeRepository } from "../repository/IPreFilterAgeRepository";
import IPreFilterAge from "../entities/IPreFilterAge";

export interface IGetAgeByIdAction {
  execute: (id: string) => Promise<IPreFilterAge | null>;
}
export const GetAgeByIdAction = (
  PreFilterAgeRepository: IPreFilterAgeRepository
): IGetAgeByIdAction => {
  return {
    execute(id) {
      return new Promise(async (resolve, reject) => {
        try {
          const age = await PreFilterAgeRepository.getById(id);
          if (!age) throw new AgeNotExistException();
          resolve(age);
        } catch (error) {
          reject(error);
        }
      });
    },
  };
};
