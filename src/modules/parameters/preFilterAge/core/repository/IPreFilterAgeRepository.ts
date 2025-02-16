import IPreFilterAge from "../entities/IPreFilterAge";

export interface IPreFilterAgeRepository {
  save: (pipe: IPreFilterAge) => Promise<IPreFilterAge>; 
  edit: (pipe: IPreFilterAge, id: string) => Promise<IPreFilterAge>; 
  getAll: (query: any) => Promise<IPreFilterAge[]>; 
  getById: (id: string) => Promise<IPreFilterAge | null>; 
  remove: (id: string) => Promise<IPreFilterAge | null>; 
}
