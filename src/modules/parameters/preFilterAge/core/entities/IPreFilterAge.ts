export default interface IPreFilterAge {
    id: string;
    segment:string;
    gender:string;
    maxAge:number;
    minAge:number;
    agePermanence:number;
    createdAt: Date;
    updatedAt: Date;
}