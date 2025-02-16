import { AgreementNotExistException } from "../exceptions/AgreementNotExistException";
import { IPreFilterAgreementRepository } from "../repository/IPreFilterAgreementRepository";
import IPreFilterAgreement from "../entities/IPreFilterAgreement";

export interface IGetAgreementByIdAction {
  execute: (id: string) => Promise<IPreFilterAgreement | null>;
}
export const GetAgreementByIdAction = (
  PreFilterAgreementRepository: IPreFilterAgreementRepository
): IGetAgreementByIdAction => {
  return {
    execute(id) {
      return new Promise(async (resolve, reject) => {
        try {
          const agreement = await PreFilterAgreementRepository.getById(id);
          if (!agreement) throw new AgreementNotExistException();
          resolve(agreement);
        } catch (error) {
          reject(error);
        }
      });
    },
  };
};
