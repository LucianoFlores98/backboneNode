import { IRucRepository } from "../repository/IRucRepository";
import IRuc from "../entities/IRuc";

export interface ISaveRucAction {
    execute: (body: IRuc) => Promise<IRuc>;
}

export const SaveRucAction = (
    RucRepository: IRucRepository
): ISaveRucAction => {
    return {
        execute: (body) => {
            return new Promise(async (resolve, reject) => {
                try {
                    const result = await RucRepository.save(body);
                    resolve(result);
                } catch (error) {
                    reject(error);
                }
            });
        },
    };
};
