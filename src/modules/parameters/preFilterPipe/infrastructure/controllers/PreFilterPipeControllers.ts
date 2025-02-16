import { Request, Response } from "express";
import { ErrorResponse, SuccessResponse } from "../../../../../helpers/api";
import { createHashMap } from "../../../../../helpers/utils";
import { IPreFilterPipeActions } from "../../core/actions/actionsProvider";
import { PipeNotExistException } from "../../core/exceptions/PipeNotExistException";

export const PreFilterControllers = ({
  save,
  edit,
  getAll,
  getById,
  remove,
}: IPreFilterPipeActions) => {
  const errorResponses = createHashMap(
    {
      [PipeNotExistException.name]: (res: Response, error: Error) =>
        ErrorResponse(res, error, 404),
    },
    (res: Response, error: Error) => ErrorResponse(res, error)
  );

  return {
    save(req: Request, res: Response) {
      const saveExecution = save.execute(req.body);
      saveExecution
        .then((pipe) => {
          const message = `Pipe creado correctamente`;
          SuccessResponse(res, 201, message, pipe);
        })
        .catch((error) => {
          errorResponses[error.name](res, error);
        });
    },
    edit(req: Request, res: Response) {
      const editExecution = edit.execute(req.body, req.params.id);
      editExecution
        .then((pipe) => {
          const message = `Pipe editado correctamente`;
          SuccessResponse(res, 200, message, pipe);
        })
        .catch((error) => {
          errorResponses[error.name](res, error);
        });
    },
    getAll(req: Request, res: Response) {
      const getAllExecution = getAll.execute(req.query);
      getAllExecution
        .then((pipes) => {
          const message = `Pipes obtenidos correctamente`;
          SuccessResponse(res, 200, message, pipes);
        })
        .catch((error) => {
          errorResponses[error.name](res, error);
        });
    },
    getById(req: Request, res: Response) {
      const getByIdExecution = getById.execute(req.params.id);
      getByIdExecution
        .then((pipe) => {
          const message = `Pipe obtenido correctamente`;
          SuccessResponse(res, 200, message, pipe);
        })
        .catch((error) => {
          errorResponses[error.name](res, error);
        });
    },

    remove(req: Request, res: Response) {
      const removeExecution = remove.execute(req.params.id);
      removeExecution
        .then((pipe) => {
          const message = `Pipe eliminado correctamente`;
          SuccessResponse(res, 200, message, pipe);
        })
        .catch((error) => {
          errorResponses[error.name](res, error);
        });
    },
  };
};
