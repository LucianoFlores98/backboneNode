import { IFileLoadRepository } from "../repository/IFileLoadRepository";
import { FileTypeEnum } from "../entities/FileTypeEnum";
import { IRucRepository } from "../../../ruc/core/repository/IRucRepository";

export interface IGetLatestFilesByTypeAction {
  execute(): Promise<{ lastCendeuPeriod: string; lastLeadPeriod: string }>;
}

export const GetLatestFilesByTypeAction = (
  fileRepository: IFileLoadRepository,
  rucRepository: IRucRepository
): IGetLatestFilesByTypeAction => {
  return {
    async execute() {
      try {
        const cendeuFile = await fileRepository.findLatestByType(
          FileTypeEnum.CENDEU
        );
        const leadFile = await fileRepository.findLatestByType(
          FileTypeEnum.LEAD
        );
        const lastRuc = await rucRepository.getLastRuc();
        return {
          lastCendeuPeriod: cendeuFile?.period || "",
          lastLeadPeriod: leadFile?.period || "",
          lastRucPeriod: lastRuc?.rucPeriod || null,
        };
      } catch (error) {
        throw error;
      }
    },
  };
};
