import IPreFilterAgreement from "../entities/IPreFilterAgreement";

export interface IPreFilterAgreementRepository {
  save: (agreement: IPreFilterAgreement) => Promise<IPreFilterAgreement>;
  edit: (agreement: IPreFilterAgreement, id: string) => Promise<IPreFilterAgreement>;
  getAll: (query: any) => Promise<IPreFilterAgreement[]>;
  getById: (id: string) => Promise<IPreFilterAgreement | null>;
  remove: (id: string) => Promise<IPreFilterAgreement | null>;
}
