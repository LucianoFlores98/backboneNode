import { IPreFilterSegmentRepository } from "../repository/IPreFilterSegmentRepository";
import { EditSegmentAction, IEditSegmentAction } from "./EditSegmentAction";
import { GetAllSegmentsAction, IGetAllSegmentsAction } from "./GetAllSegmentsAction";
import { GetSegmentByIdAction, IGetSegmentByIdAction } from "./GetSegmentByIdAction";
import { IRemoveSegmentAction, RemoveSegmentAction } from "./RemoveSegmentAction";
import { ISaveSegmentAction, SaveSegmentAction } from "./SaveSegmentAction";

export interface IPreFilterSegmentActions {
  save: ISaveSegmentAction;
  edit: IEditSegmentAction;
  getAll: IGetAllSegmentsAction;
  getById: IGetSegmentByIdAction;
  remove: IRemoveSegmentAction;
}
export const getSegmentActions = (
  PreFilterSegmentRepository: IPreFilterSegmentRepository,
) => {
  const PreFilterSegmentActions: IPreFilterSegmentActions = {
    save: SaveSegmentAction(PreFilterSegmentRepository),
    edit: EditSegmentAction(PreFilterSegmentRepository),
    getAll: GetAllSegmentsAction(PreFilterSegmentRepository),
    getById: GetSegmentByIdAction(PreFilterSegmentRepository),
    remove: RemoveSegmentAction(PreFilterSegmentRepository),
  };
  return PreFilterSegmentActions;
};
