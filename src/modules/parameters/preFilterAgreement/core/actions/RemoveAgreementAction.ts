import { IPreFilterAgreementRepository } from "../repository/IPreFilterAgreementRepository";
import { AgreementNotExistException } from "../exceptions/AgreementNotExistException"; 
import IPreFilterAgreement from "../entities/IPreFilterAgreement";

export interface IRemoveAgreementAction {
  execute: (id: string) => Promise<IPreFilterAgreement | null>;
}

export const RemoveAgreementAction = (
  PreFilterAgreementRepository: IPreFilterAgreementRepository
): IRemoveAgreementAction => {
  return {
    execute(id) {
      return new Promise(async (resolve, reject) => {
        try {
          const agreement = await PreFilterAgreementRepository.getById(id);
          if (!agreement) throw new AgreementNotExistException();
          await PreFilterAgreementRepository.remove(id);
          resolve(agreement);
        } catch (error) {
          reject(error);
        }
      });
    },
  };
};