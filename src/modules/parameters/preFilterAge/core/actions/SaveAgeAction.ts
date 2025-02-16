import { IPreFilterAgeRepository } from "../repository/IPreFilterAgeRepository";
import IPreFilterAge from "../entities/IPreFilterAge";

export interface ISaveAgeAction {
  execute: (body: IPreFilterAge) => Promise<IPreFilterAge>;
}

export const SaveAgeAction = (
  PreFilterAgeRepository: IPreFilterAgeRepository
): ISaveAgeAction => {
  return {
    execute: (body) => {
      return new Promise(async (resolve, reject) => {
        try {
          const age = {
            ...body,
          };
          const result = await PreFilterAgeRepository.save(age);

          resolve(result);
        } catch (error) {
          reject(error);
        }
      });
    },
  };
};
