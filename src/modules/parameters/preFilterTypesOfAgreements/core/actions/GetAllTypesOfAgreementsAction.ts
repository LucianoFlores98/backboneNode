import { IPreFilterTypesOfAgreementRepository } from "../repository/IPreFilterTypesOfAgreementsRepository";
import IPreFilterTypeOfAgreements from "../entities/IPreFilterTypesOfAgreements";

export interface IGetAllTypesOfAgreementsAction {
    execute: (query: any) => Promise<IPreFilterTypeOfAgreements[]>;
}
export const GetAllTypesOfAgreementsAction = (
    PreFilterTypeOfAgreementRepository: IPreFilterTypesOfAgreementRepository
): IGetAllTypesOfAgreementsAction => {
    return {
        execute(query) {
            return new Promise(async (resolve, reject) => {
                try {
                    const types = await PreFilterTypeOfAgreementRepository.getAll(query);
                    resolve(types);
                } catch (error) {
                    reject(error);
                }
            });
        },
    };
};
