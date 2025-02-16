import { IHttpClient } from "../../../../services/httpClient/interfaces";
import { IFileLoadRepository } from "../repository/IFileLoadRepository";
import { IFileUploadService } from "../services/IFileUploadService";
import { ChangeFileStatus, IChangeFileStatus } from "./ChangeFileStatus";
import {
  GetFileByNameAction,
  IGetFileByNameAction,
} from "./GetFileByNameAction";
import { 
  GetErrorFileAction, 
  IGetErrorFileAction 
} from "./GetErrorFileAction";
import {
  GetRegistersByTypeAction,
  IGetRegistersByTypeAction,
} from "./GetRegistersByType";
import {
  GetLatestFilesByTypeAction,
  IGetLatestFilesByTypeAction,
} from "./GetLatestFilesByTypeAction";
import { ISaveFileAction, SaveFileAction } from "./UploadFileAction";
import { IRucRepository } from "../../../ruc/core/repository/IRucRepository";
import {
  GetRucFileActionByName,
  IGetRucFileActionByName,
} from "./GetRucFileActionByName";

export interface IFileActions {
  save: ISaveFileAction;
  getFileByName: IGetFileByNameAction;
  getRegistersByType: IGetRegistersByTypeAction;
  changeFileStatus: IChangeFileStatus;
  getLatestFilesByType: IGetLatestFilesByTypeAction;
  getRucFileActionByName: IGetRucFileActionByName;
  getErrorFile: IGetErrorFileAction;
}
export const getFileActions = (
  fileRepository: IFileLoadRepository,
  fileService: IFileUploadService,
  httpClientService: IHttpClient,
  rucRepository: IRucRepository
) => {
  const FileLogActions: IFileActions = {
    save: SaveFileAction(fileRepository, fileService, httpClientService),
    getFileByName: GetFileByNameAction(fileService),
    getRegistersByType: GetRegistersByTypeAction(fileRepository),
    changeFileStatus: ChangeFileStatus(fileRepository, httpClientService),
    getLatestFilesByType: GetLatestFilesByTypeAction(
      fileRepository,
      rucRepository
    ),
    getRucFileActionByName: GetRucFileActionByName(httpClientService),
    getErrorFile: GetErrorFileAction(fileRepository, fileService),
  };
  return FileLogActions;
};
