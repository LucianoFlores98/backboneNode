import IRuc from "../../core/entities/IRuc";
import { IRucRepository } from "../../core/repository/IRucRepository";
import RucModel from "../model/RucModel";

export const RucRepository = (): IRucRepository => ({
    async save(register) {
        const registerCreated = await RucModel.create({
            ...register,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
        return registerCreated.toJSON() as IRuc;
    },
    async getAll(query) {
        const registers = await RucModel.findAll({ where: query });

        return registers.map((reg) => reg.toJSON() as IRuc);
    },
    async getLastRuc() {
        const lastRuc = await RucModel.findOne({
            order: [["rucPeriod", "DESC"]],
        });
    
        return lastRuc ? lastRuc.get() as IRuc : null;
    }
});
