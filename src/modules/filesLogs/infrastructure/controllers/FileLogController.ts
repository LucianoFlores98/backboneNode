import { Request, Response } from "express";
import { ErrorResponse, SuccessResponse } from "../../../../helpers/api";
import { createHashMap } from "../../../../helpers/utils";
import { IFileActions } from "../../core/actions/actionsProvider";
import { InvalidFileException } from "../../core/exceptions/InvalidException";
import { FileAlreadyExistsException } from "../../core/exceptions/FileAlreadyExistsException";
import { FileTypeEnum } from "../../core/entities/FileTypeEnum";
import { MissingParamsException } from "../../core/exceptions/MissingParamsException";
import { InvalidPeriodException } from "../../core/exceptions/InvalidPeriodException";

export const FileLogControllers = (fileActions: IFileActions) => {
  const errorResponses = createHashMap(
    {
      [InvalidFileException.name]: (res: Response, error: Error) =>
        ErrorResponse(res, error, 400),
      [FileAlreadyExistsException.name]: (res: Response, error: Error) =>
        ErrorResponse(res, error, 409),
      [InvalidPeriodException.name]: (res: Response, error: Error) =>
        ErrorResponse(res, error, 400),
    },
    (res: Response, error: Error) => ErrorResponse(res, error)
  );

  return {
    async uploadFile(req: Request, res: Response) {
      const file = req.file;
      const { period, type } = req.body;
      fileActions.save
        .execute(file, period, type)
        .then((actionResponse) => {
          SuccessResponse(
            res,
            201,
            "Archivo cargado con éxito.",
            actionResponse
          );
        })
        .catch((error) => {
          errorResponses[error.name](res, error);
        });
    },
    async getFileByName(req: Request, res: Response) {
      const { fileName, type } = req.params;
      if (!fileName || !type) {
        throw new MissingParamsException();
      }
      fileActions.getFileByName
        .execute(fileName, type as FileTypeEnum)
        .then((base64) => {
          SuccessResponse(res, 200, "Archivo recuperado  con éxito.", {
            fileName: fileName.concat(".txt"),
            base64,
          });
        })
        .catch((error) => {
          const handleError = errorResponses.default;
          return handleError(res, error);
        });
    },
    getRegistersByType(req: Request, res: Response) {
      const { type, page, size } = req.query;
      const getRegistersByTypeExecution =
        fileActions.getRegistersByType.execute(type, page, size);
      getRegistersByTypeExecution
        .then((register) => {
          const message = `Registros procesados de ${type} obtenidos correctamente`;
          SuccessResponse(res, 200, message, register);
        })
        .catch((error) => {
          errorResponses[error.name](res, error);
        });
    },
    async getLatestFiles(req: Request, res: Response) {
      fileActions.getLatestFilesByType
        .execute()
        .then((lastFiles) => {
          return SuccessResponse(
            res,
            200,
            "Últimos archivos cargados fueron obtenidos con éxito.",
            lastFiles
          );
        })
        .catch((error) => {
          const handleError = errorResponses.default;
          return handleError(res, error);
        });
    },
    changeFileStatus(req: Request, res: Response) {
      const { fileName, status, type } = req.body;
      fileActions.changeFileStatus
        .execute(fileName, status, type)
        .then((file) => {
          const message = `Archivo actualizado correctamente`;
          SuccessResponse(res, 200, message, file);
        })
        .catch((error) => {
          errorResponses[error.name](res, error);
        });
    },
    async getRucFileByName(req: Request, res: Response) {
      const { period } = req.params;
      fileActions.getRucFileActionByName
        .execute(period)
        .then((file) => {
          const message = `Archivo ruc obtenido correctamente`;
          SuccessResponse(res, 200, message, file);
        })
        .catch((error) => {
          errorResponses[error.name](res, error);
        });
    },
    async getErrorFile(req: Request, res: Response) {
      const { period, type } = req.body;

      try {
        if (!period || !type) {
          throw new Error("Faltan parámetros obligatorios: period y type.");
        }

        const result = await fileActions.getErrorFile.execute(period, type);

        SuccessResponse(res, 200, "Archivo recuperado con éxito.", result);
      } catch (error) {
        const handleError = errorResponses.default;
        return handleError(res, error);
      }
    }
  };
};
