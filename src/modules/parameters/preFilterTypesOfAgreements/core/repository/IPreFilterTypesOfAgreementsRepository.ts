import IPreFilterTypesOfAgreements from "../entities/IPreFilterTypesOfAgreements";

export interface IPreFilterTypesOfAgreementRepository {
    save: (agreement: IPreFilterTypesOfAgreements) => Promise<IPreFilterTypesOfAgreements>;
    edit: (agreement: IPreFilterTypesOfAgreements, id: string) => Promise<IPreFilterTypesOfAgreements>;
    getAll: (query: any) => Promise<IPreFilterTypesOfAgreements[]>;
    getById: (id: string) => Promise<IPreFilterTypesOfAgreements | null>;
    remove: (id: string) => Promise<IPreFilterTypesOfAgreements | null>;
}
