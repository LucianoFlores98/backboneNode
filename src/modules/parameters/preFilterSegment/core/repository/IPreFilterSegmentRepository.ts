import IPreFilterSegment from "../entities/IPreFilterSegment";

export interface IPreFilterSegmentRepository {
  save: (pipe: IPreFilterSegment) => Promise<IPreFilterSegment>; 
  edit: (pipe: IPreFilterSegment, id: number) => Promise<IPreFilterSegment>; 
  getAll: (query: any) => Promise<IPreFilterSegment[]>; 
  getById: (id: number) => Promise<IPreFilterSegment | null>; 
  remove: (id: number) => Promise<IPreFilterSegment | null>; 
}
