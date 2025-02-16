import IPreFilterPipe from "../entities/IPreFilterPipe";

export interface IPreFilterPipeRepository {
  save: (pipe: IPreFilterPipe) => Promise<IPreFilterPipe>; 
  edit: (pipe: IPreFilterPipe, id: string) => Promise<IPreFilterPipe>; 
  getAll: (query: any) => Promise<IPreFilterPipe[]>; 
  getById: (id: string) => Promise<IPreFilterPipe | null>; 
  remove: (id: string) => Promise<IPreFilterPipe | null>; 
}
