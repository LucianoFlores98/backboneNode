import { DependencyManager } from "../../dependencyManager";
import { FileLoadRepository } from "./infrastructure/repository/FileLoadRepository";
import { FileUploadService } from "./infrastructure/services/FileUploadService";

export const FileLogModuleInitializer = (
  dependencyManager: DependencyManager
) => {
  const fileLoadRepository = FileLoadRepository();
  const fileUploadService = FileUploadService();

  dependencyManager.register("fileLoadRepository", fileLoadRepository);
  dependencyManager.register("fileUploadService", fileUploadService);
};
