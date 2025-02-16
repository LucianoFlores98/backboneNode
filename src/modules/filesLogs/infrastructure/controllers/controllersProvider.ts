import { DependencyManager } from "../../../../dependencyManager";
import { IHttpClient } from "../../../../services/httpClient/interfaces";
import { IRucRepository } from "../../../ruc/core/repository/IRucRepository";
import { getFileActions } from "../../core/actions/actionsProvider";
import { IFileLoadRepository } from "../../core/repository/IFileLoadRepository";
import { IFileUploadService } from "../../core/services/IFileUploadService";
import { FileLogControllers } from "./FileLogController";

export const getFileLogControllers = (dependencyManager: DependencyManager) => {
  const fileRepository = getFileLoadRepository(dependencyManager);
  const fileUploadService = getFileUploadService(dependencyManager);
  const httpClientService = getHttpClientModule(dependencyManager);
  const rucRepository = getRUCRepository(dependencyManager);
  const fileActions = getFileActions(
    fileRepository,
    fileUploadService,
    httpClientService,
    rucRepository
  );
  return FileLogControllers(fileActions);
};

export const getFileLoadRepository = (dependencyManager: DependencyManager) => {
  return dependencyManager.resolve("fileLoadRepository") as IFileLoadRepository;
};

export const getFileUploadService = (dependencyManager: DependencyManager) => {
  return dependencyManager.resolve("fileUploadService") as IFileUploadService;
};

export const getHttpClientModule = (dependencyManager: DependencyManager) => {
  return dependencyManager.resolve("httpClient") as IHttpClient;
};

export const getRUCRepository = (dependencyManager: DependencyManager) => {
  return dependencyManager.resolve("rucRepository") as IRucRepository;
};
