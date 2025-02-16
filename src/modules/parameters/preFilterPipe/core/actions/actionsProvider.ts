import { IPreFilterPipeRepository } from "../repository/IPreFilterPipeRepository";
import { ISavePipeAction, SavePipeAction } from "./SavePipeAction";
import { IEditPipeAction, EditPipeAction } from "./EditPipeAction";
import { IGetAllPipeAction, GetAllPipesAction } from "./GetAllPipesAction";
import { IGetPipeByIdAction, GetPipeByIdAction } from "./GetPipeByIdAction";
import { IRemovePipeAction, RemovePipeAction } from "./RemovePipeAction";

export interface IPreFilterPipeActions {
  save: ISavePipeAction;
  edit: IEditPipeAction;
  getAll: IGetAllPipeAction;
  getById: IGetPipeByIdAction;
  remove: IRemovePipeAction;
}
export const getPipeActions = (
  PreFilterPipeRepository: IPreFilterPipeRepository,
) => {
  const PreFilterPipeActions: IPreFilterPipeActions = {
    save: SavePipeAction(PreFilterPipeRepository),
    edit: EditPipeAction(PreFilterPipeRepository),
    getAll: GetAllPipesAction(PreFilterPipeRepository),
    getById: GetPipeByIdAction(PreFilterPipeRepository),
    remove: RemovePipeAction(PreFilterPipeRepository),
  };
  return PreFilterPipeActions;
};
