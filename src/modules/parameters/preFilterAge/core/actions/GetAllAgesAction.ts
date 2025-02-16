import { IPreFilterAgeRepository } from "../repository/IPreFilterAgeRepository";
import IPreFilterAge from "../entities/IPreFilterAge";

export interface IGetAllAgesAction {
  execute: (query: any) => Promise<IPreFilterAge[]>;
}
export const GetAllAgesAction = (
  PreFilterAgeRepository: IPreFilterAgeRepository
): IGetAllAgesAction => {
  return {
    execute(query) {
      return new Promise(async (resolve, reject) => {
        try {
          const ages = await PreFilterAgeRepository.getAll(query);
          resolve(ages);
        } catch (error) {
          reject(error);
        }
      });
    },
  };
};
