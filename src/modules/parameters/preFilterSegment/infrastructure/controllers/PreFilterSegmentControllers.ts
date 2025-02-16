import { Request, Response } from "express";
import { ErrorResponse, SuccessResponse } from "../../../../../helpers/api";
import { createHashMap } from "../../../../../helpers/utils";
import { IPreFilterSegmentActions } from "../../core/actions/actionsProvider";
import { SegmentNotExistException } from "../../core/exceptions/SegmentNotExistException";

export const PreFilterSegmentControllers = ({
  save,
  edit,
  getAll,
  getById,
  remove,
}: IPreFilterSegmentActions) => {
  const errorResponses = createHashMap(
    {
      [SegmentNotExistException.name]: (res: Response, error: Error) =>
        ErrorResponse(res, error, 404),
    },
    (res: Response, error: Error) => ErrorResponse(res, error)
  );

  return {
    save(req: Request, res: Response) {
      const saveExecution = save.execute(req.body);
      saveExecution
        .then((segment) => {
          const message = `Segment created successfully`;
          SuccessResponse(res, 201, message, segment);
        })
        .catch((error) => {
          errorResponses[error.name](res, error);
        });
    },
    edit(req: Request, res: Response) {

      const id = parseInt(req.params.id, 10);

      if (isNaN(id)) {
        const error = new Error("Invalid ID parameter");
        error.name = "ValidationError";
        return errorResponses[error.name](res, error);
      }

      const editExecution = edit.execute(req.body, id);
      
      editExecution
        .then((segment) => {
          const message = `Segment edited successfully`;
          SuccessResponse(res, 200, message, segment);
        })
        .catch((error) => {
          errorResponses[error.name](res, error);
        });
    },
    getAll(req: Request, res: Response) {
      const getAllExecution = getAll.execute(req.query);
      getAllExecution
        .then((segments) => {
          const message = `Segments retrieved successfully`;
          SuccessResponse(res, 200, message, segments);
        })
        .catch((error) => {
          errorResponses[error.name](res, error);
        });
    },
    getById(req: Request, res: Response) {
      const id = parseInt(req.params.id, 10); // Usa base 10 para la conversión

      // Validar si la conversión fue exitosa
      if (isNaN(id)) {
        const error = new Error("Invalid ID parameter");
        error.name = "ValidationError";
        return errorResponses[error.name](res, error);
      }
      const getByIdExecution = getById.execute(id);
      getByIdExecution
        .then((segment) => {
          const message = `Segment retrieved successfully`;
          SuccessResponse(res, 200, message, segment);
        })
        .catch((error) => {
          errorResponses[error.name](res, error);
        });
    },

    remove(req: Request, res: Response) {
      const id = parseInt(req.params.id, 10); // Usa base 10 para la conversión

      // Validar si la conversión fue exitosa
      if (isNaN(id)) {
        const error = new Error("Invalid ID parameter");
        error.name = "ValidationError";
        return errorResponses[error.name](res, error);
      }
      const removeExecution = remove.execute(id);
      removeExecution
        .then((segment) => {
          const message = `Segment deleted successfully`;
          SuccessResponse(res, 200, message, segment);
        })
        .catch((error) => {
          errorResponses[error.name](res, error);
        });
    },
  };
};
