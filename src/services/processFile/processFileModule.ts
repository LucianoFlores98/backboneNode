import multer, { Multer } from "multer";
import path from "path";
import { DependencyManager } from "../../dependencyManager";
import { IFileManaging } from "./interfaces";

const storage = multer.diskStorage({
  destination: "./files/",
  filename: function (req, file, cb) {
    cb(
      null,
      file.originalname.split(".")[0] +
        "-" +
        Date.now() +
        path.extname(file.originalname)
    );
  },
});

export const processFileModuleInitialize = (
  dependencyManager: DependencyManager
): void => {
  const multerProcess = multer({
    storage: storage,
    limits: {
      fileSize: parseInt(process.env.FILE_SIZE || "1000000"),
    },
  });
  const manageFile = fileManaging(multerProcess);
  dependencyManager.register("processFileService", manageFile);
};

const fileManaging = (multerProcess: Multer): IFileManaging => {
  return {
    uploadSingle(fileName) {
      return multerProcess.single(fileName);
    },
  };
};
