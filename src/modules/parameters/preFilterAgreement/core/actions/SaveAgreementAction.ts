import { IPreFilterAgreementRepository } from "../repository/IPreFilterAgreementRepository";
import IPreFilterAgreement from "../entities/IPreFilterAgreement";

export interface ISaveAgreementAction {
  execute: (body: IPreFilterAgreement) => Promise<IPreFilterAgreement>;
}

export const SaveAgreementAction = (
  PreFilterAgreementRepository: IPreFilterAgreementRepository
): ISaveAgreementAction => {
  return {
    execute: (body) => {
      return new Promise(async (resolve, reject) => {
        try {
          const agreement = {
            ...body,
          };
          const result = await PreFilterAgreementRepository.save(agreement);

          resolve(result);
        } catch (error) {
          reject(error);
        }
      });
    },
  };
};
