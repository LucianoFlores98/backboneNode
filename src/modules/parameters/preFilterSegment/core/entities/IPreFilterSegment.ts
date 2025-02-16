export default interface IPreFilterSegment {
    id: number;
    segment: string;
    days_late_tc: number;
    days_late_pp: number;
    global_max_amount: number;
    max_transaction_amount: number;
    affectation: number;
    global_indebtedness: number;
    createdAt: Date;
    updatedAt: Date;
}