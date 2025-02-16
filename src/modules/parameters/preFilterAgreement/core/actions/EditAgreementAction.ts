import { IPreFilterAgreementRepository } from "../repository/IPreFilterAgreementRepository";
import { AgreementNotExistException } from "../exceptions/AgreementNotExistException";
import IPreFilterAgreement from "../entities/IPreFilterAgreement";

export interface IEditAgreementAction {
  execute: (body: IPreFilterAgreement, id: string) => Promise<IPreFilterAgreement>;
}

export const EditAgreementAction = (
  PreFilterAgreementRepository: IPreFilterAgreementRepository,
): IEditAgreementAction => {
  return {
    execute(body, id) {
      return new Promise(async (resolve, reject) => {
        try {
    
          const agreement = await PreFilterAgreementRepository.getById(id);

          await PreFilterAgreementRepository.edit(body, id);
          const result = await PreFilterAgreementRepository.getById(id);

          if(!agreement || !result) throw new AgreementNotExistException();

          resolve(result);
        } catch (error) {
          reject(error);
        }
      });
    },
  };
};
