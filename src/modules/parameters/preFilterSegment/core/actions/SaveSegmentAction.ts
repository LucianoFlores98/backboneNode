import IPreFilterSegment from "../entities/IPreFilterSegment";
import { IPreFilterSegmentRepository } from "../repository/IPreFilterSegmentRepository";

export interface ISaveSegmentAction {
    execute: (body: IPreFilterSegment) => Promise<IPreFilterSegment>;
  }
  
  export const SaveSegmentAction = (
    PreFilterSegmentRepository: IPreFilterSegmentRepository
  ): ISaveSegmentAction => {
    return {
      execute: (body) => {
        return new Promise(async (resolve, reject) => {
          try {
            
            const result = await PreFilterSegmentRepository.save(body);
  
            resolve(result);
          } catch (error) {
            reject(error);
          }
        });
      },
    };
  };
  