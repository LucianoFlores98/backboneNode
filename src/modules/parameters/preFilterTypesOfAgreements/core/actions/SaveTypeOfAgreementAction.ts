import { IPreFilterTypesOfAgreementRepository } from "../repository/IPreFilterTypesOfAgreementsRepository";
import IPreFilterTypeOfAgreements from "../entities/IPreFilterTypesOfAgreements";

export interface ISaveTypeOfAgreementAction {
    execute: (body: IPreFilterTypeOfAgreements) => Promise<IPreFilterTypeOfAgreements>;
}

export const SaveTypeOfAgreementAction = (
    PreFilterTypeOfAgreementRepository: IPreFilterTypesOfAgreementRepository
): ISaveTypeOfAgreementAction => {
    return {
        execute: (body) => {
            return new Promise(async (resolve, reject) => {
                try {
                    const result = await PreFilterTypeOfAgreementRepository.save(body);                    
                    resolve(result);
                } catch (error) {
                    reject(error);
                }
            });
        },
    };
};
