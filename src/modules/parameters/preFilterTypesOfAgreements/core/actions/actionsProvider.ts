import { IPreFilterTypesOfAgreementRepository } from "../repository/IPreFilterTypesOfAgreementsRepository";
import { ISaveTypeOfAgreementAction, SaveTypeOfAgreementAction } from "./SaveTypeOfAgreementAction";
import { IEditTypeOfAgreementAction, EditTypeOfAgreementAction } from "./EditTypeOfAgreementAction";
import { IGetAllTypesOfAgreementsAction, GetAllTypesOfAgreementsAction } from "./GetAllTypesOfAgreementsAction";
import { IGetTypeOfAgreementByIdAction, GetTypeOfAgreementByIdAction } from "./GetTypeOfAgreementByIdAction";
import { IRemoveTypeOfAgreementAction, RemoveTypeOfAgreementAction } from "./RemoveTypeOfAgreementAction";

export interface IPreFilterTypeOfAgreementActions {
    save: ISaveTypeOfAgreementAction;
    edit: IEditTypeOfAgreementAction;
    getAll: IGetAllTypesOfAgreementsAction;
    getById: IGetTypeOfAgreementByIdAction;
    remove: IRemoveTypeOfAgreementAction;
}
export const getPreFilterTypeOfAgreementActions = (
    PreFilterTypeOfAgrementRepository: IPreFilterTypesOfAgreementRepository,
) => {
    const PreFilterTypeOfAgreementActions: IPreFilterTypeOfAgreementActions = {
        save: SaveTypeOfAgreementAction(PreFilterTypeOfAgrementRepository),
        edit: EditTypeOfAgreementAction(PreFilterTypeOfAgrementRepository),
        getAll: GetAllTypesOfAgreementsAction(PreFilterTypeOfAgrementRepository),
        getById: GetTypeOfAgreementByIdAction(PreFilterTypeOfAgrementRepository),
        remove: RemoveTypeOfAgreementAction(PreFilterTypeOfAgrementRepository),
    };
    return PreFilterTypeOfAgreementActions;
};
