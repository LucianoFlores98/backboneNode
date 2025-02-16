import IRuc from "../entities/IRuc";
export interface IRucRepository {
    save: (ruc: IRuc) => Promise<IRuc>;
    getAll: (query: any) => Promise<IRuc[]>;
    getLastRuc: () => Promise<IRuc | null>;
}