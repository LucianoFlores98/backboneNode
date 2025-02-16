import IPreFilterSegment from "../entities/IPreFilterSegment";
import { SegmentNotExistException } from "../exceptions/SegmentNotExistException";
import { IPreFilterSegmentRepository } from "../repository/IPreFilterSegmentRepository";

export interface IGetAllSegmentsAction {
  execute: (query: any) => Promise<IPreFilterSegment[]>;
}
export const GetAllSegmentsAction = (
  PreFilterSegmentRepository: IPreFilterSegmentRepository
): IGetAllSegmentsAction => {
  return {
    execute(query) {
      return new Promise(async (resolve, reject) => {
        try {
          const segments = await PreFilterSegmentRepository.getAll(query);

          if (!segments) throw new SegmentNotExistException();

          resolve(segments);
        } catch (error) {
          reject(error);
        }
      });
    },
  };
};
