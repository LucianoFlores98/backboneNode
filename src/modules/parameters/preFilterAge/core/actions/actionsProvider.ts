import { IPreFilterAgeRepository } from "../repository/IPreFilterAgeRepository";
import { ISaveAgeAction, SaveAgeAction } from "./SaveAgeAction";
import { IEditAgeAction, EditAgeAction } from "./EditAgeAction";
import { IGetAllAgesAction, GetAllAgesAction } from "./GetAllAgesAction";
import { IGetAgeByIdAction, GetAgeByIdAction } from "./GetAgeByIdAction";
import { IRemoveAgeAction, RemoveAgeAction } from "./RemoveAgeAction";

export interface IPreFilterAgeActions {
  save: ISaveAgeAction;
  edit: IEditAgeAction;
  getAll: IGetAllAgesAction;
  getById: IGetAgeByIdAction;
  remove: IRemoveAgeAction;
}
export const getAgeActions = (
  PreFilterAgeRepository: IPreFilterAgeRepository,
) => {
  const PreFilterAgeActions: IPreFilterAgeActions = {
    save: SaveAgeAction(PreFilterAgeRepository),
    edit: EditAgeAction(PreFilterAgeRepository),
    getAll: GetAllAgesAction(PreFilterAgeRepository),
    getById: GetAgeByIdAction(PreFilterAgeRepository),
    remove: RemoveAgeAction(PreFilterAgeRepository),
  };
  return PreFilterAgeActions;
};
