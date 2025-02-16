import { Router } from "express";
import { DependencyManager } from "../../../../dependencyManager";
import { getFileLogControllers } from "../controllers/controllersProvider";
import { IFileManaging } from "../../../../services/processFile/interfaces";

const getFileLogRoutes = (dependencyManager: DependencyManager) => {
  const processFileService = getProcessFileModule(dependencyManager);
  const {
    uploadFile,
    getFileByName,
    getRegistersByType,
    changeFileStatus,
    getLatestFiles,
    getRucFileByName,
    getErrorFile
  } = getFileLogControllers(dependencyManager);

  const fileLogRouter = Router();
  const path = "fileLogs";

  fileLogRouter.post(
    `/${path}/upload`,
    processFileService.uploadSingle("file"),
    uploadFile
  );
  fileLogRouter.post(`/${path}/error`, getErrorFile);
  fileLogRouter.get(`/${path}/latest`, getLatestFiles);
  fileLogRouter.get(`/${path}`, getRegistersByType);
  fileLogRouter.get(`/${path}/download/:type/:fileName`, getFileByName);
  fileLogRouter.patch(`/${path}`, changeFileStatus);
  fileLogRouter.get(`/${path}/ruc/:period`, getRucFileByName);

  return fileLogRouter;
};

const getProcessFileModule = (dependencyManager: DependencyManager) => {
  return dependencyManager.resolve("processFileService") as IFileManaging;
};

export default getFileLogRoutes;
