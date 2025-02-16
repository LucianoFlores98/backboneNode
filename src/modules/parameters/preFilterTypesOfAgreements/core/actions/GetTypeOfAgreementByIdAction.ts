import { IPreFilterTypesOfAgreementRepository } from "../repository/IPreFilterTypesOfAgreementsRepository";
import IPreFilterTypeOfAgreements from "../entities/IPreFilterTypesOfAgreements";
import { TypeOfAgreementNotExistException } from "../exceptions/TypeOfAgreementNotExistException";

export interface IGetTypeOfAgreementByIdAction {
    execute: (id: string) => Promise<IPreFilterTypeOfAgreements | null>;
}
export const GetTypeOfAgreementByIdAction = (
    PreFilterTypeOfAgreementRepository: IPreFilterTypesOfAgreementRepository
): IGetTypeOfAgreementByIdAction => {
    return {
        execute(id) {
            return new Promise(async (resolve, reject) => {
                try {
                    const type = await PreFilterTypeOfAgreementRepository.getById(id);
                    if (!type) throw new TypeOfAgreementNotExistException();
                    resolve(type);
                } catch (error) {
                    reject(error);
                }
            });
        },
    };
};
