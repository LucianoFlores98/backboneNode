import { IPreFilterAgreementRepository } from "../repository/IPreFilterAgreementRepository";
import { ISaveAgreementAction, SaveAgreementAction } from "./SaveAgreementAction";
import { IEditAgreementAction, EditAgreementAction } from "./EditAgreementAction";
import { IGetAllAgreementsAction, GetAllAgreementsAction } from "./GetAllAgreementsAction";
import { IGetAgreementByIdAction, GetAgreementByIdAction } from "./GetAgreementByIdAction";
import { IRemoveAgreementAction, RemoveAgreementAction } from "./RemoveAgreementAction";

export interface IPreFilterAgreementActions {
  save: ISaveAgreementAction;
  edit: IEditAgreementAction;
  getAll: IGetAllAgreementsAction;
  getById: IGetAgreementByIdAction;
  remove: IRemoveAgreementAction;
}
export const getAgreementActions = (
  PreFilterAgreementRepository: IPreFilterAgreementRepository,
) => {
  const PreFilterAgreementActions: IPreFilterAgreementActions = {
    save: SaveAgreementAction(PreFilterAgreementRepository),
    edit: EditAgreementAction(PreFilterAgreementRepository),
    getAll: GetAllAgreementsAction(PreFilterAgreementRepository),
    getById: GetAgreementByIdAction(PreFilterAgreementRepository),
    remove: RemoveAgreementAction(PreFilterAgreementRepository),
  };
  return PreFilterAgreementActions;
};
