import { Request, Response } from "express";
import { ErrorResponse, SuccessResponse } from "../../../../../helpers/api";
import { createHashMap } from "../../../../../helpers/utils";
import { IPreFilterAgeActions } from "../../core/actions/actionsProvider";
import { AgeNotExistException } from "../../core/exceptions/AgeNotExistException";

export const PreFilterAgeControllers = ({
  save,
  edit,
  getAll,
  getById,
  remove,
}: IPreFilterAgeActions) => {
  const errorResponses = createHashMap(
    {
      [AgeNotExistException.name]: (res: Response, error: Error) =>
        ErrorResponse(res, error, 404),
    },
    (res: Response, error: Error) => ErrorResponse(res, error)
  );

  return {
    save(req: Request, res: Response) {
      const saveExecution = save.execute(req.body);
      saveExecution
        .then((age) => {
          const message = `Edad creada correctamente`;
          SuccessResponse(res, 201, message, age);
        })
        .catch((error) => {
          errorResponses[error.name](res, error);
        });
    },
    edit(req: Request, res: Response) {
      const editExecution = edit.execute(req.body, req.params.id);
      editExecution
        .then((age) => {
          const message = `Edad editada correctamente`;
          SuccessResponse(res, 200, message, age);
        })
        .catch((error) => {
          errorResponses[error.name](res, error);
        });
    },
    getAll(req: Request, res: Response) {
      const getAllExecution = getAll.execute(req.query);
      getAllExecution
        .then((pipes) => {
          const message = `Edades obtenidas correctamente`;
          SuccessResponse(res, 200, message, pipes);
        })
        .catch((error) => {
          errorResponses[error.name](res, error);
        });
    },
    getById(req: Request, res: Response) {
      const getByIdExecution = getById.execute(req.params.id);
      getByIdExecution
        .then((age) => {
          const message = `Edad obtenida correctamente`;
          SuccessResponse(res, 200, message, age);
        })
        .catch((error) => {
          errorResponses[error.name](res, error);
        });
    },

    remove(req: Request, res: Response) {
      const removeExecution = remove.execute(req.params.id);
      removeExecution
        .then((age) => {
          const message = `Edad eliminada correctamente`;
          SuccessResponse(res, 200, message, age);
        })
        .catch((error) => {
          errorResponses[error.name](res, error);
        });
    },
  };
};
