import IPreFilterSegment from "../entities/IPreFilterSegment";
import { SegmentNotExistException } from "../exceptions/SegmentNotExistException";
import { IPreFilterSegmentRepository } from "../repository/IPreFilterSegmentRepository";

export interface IRemoveSegmentAction {
    execute: (id: number) => Promise<IPreFilterSegment>;
  }
  
  export const RemoveSegmentAction = (
    PreFilterSegmentRepository: IPreFilterSegmentRepository
  ): IRemoveSegmentAction => {
    return {
      execute(id) {
        return new Promise(async (resolve, reject) => {
          try {
            const segment = await PreFilterSegmentRepository.getById(id);
            if (!segment) throw new SegmentNotExistException();
            await PreFilterSegmentRepository.remove(id);
            resolve(segment);
          } catch (error) {
            reject(error);
          }
        });
      },
    };
  };