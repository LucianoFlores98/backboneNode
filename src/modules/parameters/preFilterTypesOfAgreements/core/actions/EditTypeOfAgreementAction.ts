import IPreFilterTypeOfAgreements from "../entities/IPreFilterTypesOfAgreements";
import { IPreFilterTypesOfAgreementRepository } from "../repository/IPreFilterTypesOfAgreementsRepository";
import { TypeOfAgreementNotExistException } from "../exceptions/TypeOfAgreementNotExistException";

export interface IEditTypeOfAgreementAction {
    execute: (body: IPreFilterTypeOfAgreements, id: string) => Promise<IPreFilterTypeOfAgreements>;
}

export const EditTypeOfAgreementAction = (
    PreFilterTypeOfAgreementRepository: IPreFilterTypesOfAgreementRepository,
): IEditTypeOfAgreementAction => {
    return {
        execute(body, id) {
            return new Promise(async (resolve, reject) => {
                try {
                    await PreFilterTypeOfAgreementRepository.edit(body, id);
                    const result = await PreFilterTypeOfAgreementRepository.getById(id);

                    if (!result) throw new TypeOfAgreementNotExistException();
                    
                    resolve(result);
                } catch (error) {
                    reject(error);
                }
            });
        },
    };
};
