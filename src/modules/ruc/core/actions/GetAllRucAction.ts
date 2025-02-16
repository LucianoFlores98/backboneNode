import { IRucRepository } from "../repository/IRucRepository";
import IRuc from "../entities/IRuc";

export interface IGetAllRucAction {
    execute: (query: any) => Promise<IRuc[]>;
}
export const GetAllRucAction = (
    RucRepository: IRucRepository
): IGetAllRucAction => {
    return {
        execute(query) {
            return new Promise(async (resolve, reject) => {
                try {
                    const registers = await RucRepository.getAll(query);
                    resolve(registers);
                } catch (error) {
                    reject(error);
                }
            });
        },
    };
};
