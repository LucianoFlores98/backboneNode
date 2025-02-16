import IPreFilterSegment from "../entities/IPreFilterSegment";
import { SegmentNotExistException } from "../exceptions/SegmentNotExistException";
import { IPreFilterSegmentRepository } from "../repository/IPreFilterSegmentRepository";

export interface IGetSegmentByIdAction {
    execute: (id: number) => Promise<IPreFilterSegment>;
  }
  export const GetSegmentByIdAction = (
    PreFilterSegmentRepository: IPreFilterSegmentRepository
  ): IGetSegmentByIdAction => {
    return {
      execute(id) {
        return new Promise(async (resolve, reject) => {
          try {
            const segment = await PreFilterSegmentRepository.getById(id);
            if (!segment) throw new SegmentNotExistException();
            resolve(segment);
          } catch (error) {
            reject(error);
          }
        });
      },
    };
  };
  