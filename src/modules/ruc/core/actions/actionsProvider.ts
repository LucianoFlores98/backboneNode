import { IRucRepository } from "../repository/IRucRepository";
import { ISaveRucAction, SaveRucAction } from "./SaveRucAction";
import { IGetAllRucAction, GetAllRucAction } from "./GetAllRucAction";

export interface IRucActions {
    save: ISaveRucAction;
    getAll: IGetAllRucAction;
}
export const getRucActions = (
    RucRepository: IRucRepository,
) => {
    const RucActions: IRucActions = {
        save: SaveRucAction(RucRepository),
        getAll: GetAllRucAction(RucRepository),
    };
    return RucActions;
};
