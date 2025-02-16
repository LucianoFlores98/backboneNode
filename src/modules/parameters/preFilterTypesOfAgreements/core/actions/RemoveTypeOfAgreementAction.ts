import { IPreFilterTypesOfAgreementRepository } from "../repository/IPreFilterTypesOfAgreementsRepository";
import IPreFilterTypeOfAgreement from "../entities/IPreFilterTypesOfAgreements";
import { TypeOfAgreementNotExistException } from "../exceptions/TypeOfAgreementNotExistException";

export interface IRemoveTypeOfAgreementAction {
    execute: (id: string) => Promise<IPreFilterTypeOfAgreement | null>;
}

export const RemoveTypeOfAgreementAction = (
    PreFilterTypeOfAgreementRepository: IPreFilterTypesOfAgreementRepository
): IRemoveTypeOfAgreementAction => {
    return {
        execute(id) {
            return new Promise(async (resolve, reject) => {
                try {
                    const type = await PreFilterTypeOfAgreementRepository.getById(id);
                    if (!type) throw new TypeOfAgreementNotExistException();
                    await PreFilterTypeOfAgreementRepository.remove(id);
                    resolve(type);
                } catch (error) {
                    reject(error);
                }
            });
        },
    };
};