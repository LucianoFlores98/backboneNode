import { Request, Response } from "express";
import { ErrorResponse, SuccessResponse } from "../../../../../helpers/api";
import { createHashMap } from "../../../../../helpers/utils";
import { IPreFilterAgreementActions } from "../../core/actions/actionsProvider";
import { AgreementNotExistException } from "../../core/exceptions/AgreementNotExistException";

export const PreFilterAgreementControllers = ({
  save,
  edit,
  getAll,
  getById,
  remove,
}: IPreFilterAgreementActions) => {
  const errorResponses = createHashMap(
    {
      [AgreementNotExistException.name]: (res: Response, error: Error) =>
        ErrorResponse(res, error, 404),
    },
    (res: Response, error: Error) => ErrorResponse(res, error)
  );

  return {
    save(req: Request, res: Response) {
      const saveExecution = save.execute(req.body);
      saveExecution
        .then((agreement) => {
          const message = `Convenio creado correctamente`;
          SuccessResponse(res, 201, message, agreement);
        })
        .catch((error) => {
          errorResponses[error.name](res, error);
        });
    },
    edit(req: Request, res: Response) {
      const editExecution = edit.execute(req.body, req.params.id);
      editExecution
        .then((agreement) => {
          const message = `Convenio editado correctamente`;
          SuccessResponse(res, 200, message, agreement);
        })
        .catch((error) => {
          errorResponses[error.name](res, error);
        });
    },
    getAll(req: Request, res: Response) {
      const getAllExecution = getAll.execute(req.query);
      getAllExecution
        .then((agreement) => {
          const message = `Convenios obtenidos correctamente`;
          SuccessResponse(res, 200, message, agreement);
        })
        .catch((error) => {
          errorResponses[error.name](res, error);
        });
    },
    getById(req: Request, res: Response) {
      const getByIdExecution = getById.execute(req.params.id);
      getByIdExecution
        .then((agreement) => {
          const message = `Convenio obtenido correctamente`;
          SuccessResponse(res, 200, message, agreement);
        })
        .catch((error) => {
          errorResponses[error.name](res, error);
        });
    },

    remove(req: Request, res: Response) {
      const removeExecution = remove.execute(req.params.id);
      removeExecution
        .then((agreement) => {
          const message = `Convenio eliminado correctamente`;
          SuccessResponse(res, 200, message, agreement);
        })
        .catch((error) => {
          errorResponses[error.name](res, error);
        });
    },
  };
};
