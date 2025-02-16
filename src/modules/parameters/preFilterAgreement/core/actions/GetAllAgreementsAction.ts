import { IPreFilterAgreementRepository } from "../repository/IPreFilterAgreementRepository";
import IPreFilterAgreement from "../entities/IPreFilterAgreement";

export interface IGetAllAgreementsAction {
  execute: (query: any) => Promise<IPreFilterAgreement[]>;
}
export const GetAllAgreementsAction = (
  PreFilterAgreementRepository: IPreFilterAgreementRepository
): IGetAllAgreementsAction => {
  return {
    execute(query) {
      return new Promise(async (resolve, reject) => {
        try {
          const agreement = await PreFilterAgreementRepository.getAll(query);
          resolve(agreement);
        } catch (error) {
          reject(error);
        }
      });
    },
  };
};
