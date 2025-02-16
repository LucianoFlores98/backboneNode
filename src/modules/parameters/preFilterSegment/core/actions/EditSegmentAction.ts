import IPreFilterSegment from "../entities/IPreFilterSegment";
import { SegmentNotExistException } from "../exceptions/SegmentNotExistException";
import { IPreFilterSegmentRepository } from "../repository/IPreFilterSegmentRepository";

export interface IEditSegmentAction {
  execute: (body: IPreFilterSegment, id: number) => Promise<IPreFilterSegment>;
}
  
export const EditSegmentAction = (
  PreFilterSegmentRepository: IPreFilterSegmentRepository,
): IEditSegmentAction => {
  return {
    execute(body, id) {
      return new Promise(async (resolve, reject) => {

        try {
    
          const segment = await PreFilterSegmentRepository.getById(id);
          
          await PreFilterSegmentRepository.edit(body, id);
          const result = await PreFilterSegmentRepository.getById(id);

          if (!segment || !result) throw new SegmentNotExistException();

          resolve(result);
        } catch (error) {
          reject(error);
        }
      });
    },
  };
};
  