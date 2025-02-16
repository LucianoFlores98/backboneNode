import { Request, Response } from "express";
import { ErrorResponse, SuccessResponse } from "../../../../../helpers/api";
import { createHashMap } from "../../../../../helpers/utils";
import { IPreFilterTypeOfAgreementActions } from "../../core/actions/actionsProvider";
import { TypeOfAgreementNotExistException } from "../../core/exceptions/TypeOfAgreementNotExistException";

export const PreFilterTypeOfAgreementsControllers = ({
    save,
    edit,
    getAll,
    getById,
    remove,
}: IPreFilterTypeOfAgreementActions) => {
    const errorResponses = createHashMap(
        {
            [TypeOfAgreementNotExistException.name]: (res: Response, error: Error) =>
                ErrorResponse(res, error, 404),
        },
        (res: Response, error: Error) => ErrorResponse(res, error)
    );

    return {
        save(req: Request, res: Response) {
            const saveExecution = save.execute(req.body);
            saveExecution
                .then((type) => {
                    const message = `Tipo de convenio creado correctamente`;
                    SuccessResponse(res, 201, message, type);
                })
                .catch((error) => {
                    errorResponses[error.name](res, error);
                });
        },
        edit(req: Request, res: Response) {
            const editExecution = edit.execute(req.body, req.params.id);
            editExecution
                .then((type) => {
                    const message = `Tipo de convenio editado correctamente`;
                    SuccessResponse(res, 200, message, type);
                })
                .catch((error) => {
                    errorResponses[error.name](res, error);
                });
        },
        getAll(req: Request, res: Response) {
            const getAllExecution = getAll.execute(req.query);
            getAllExecution
                .then((types) => {
                    const message = `Tipos de convenios obtenidos correctamente`;
                    SuccessResponse(res, 200, message, types);
                })
                .catch((error) => {
                    errorResponses[error.name](res, error);
                });
        },
        getById(req: Request, res: Response) {
            const getByIdExecution = getById.execute(req.params.id);
            getByIdExecution
                .then((type) => {
                    const message = `Tipo de convenio obtenido correctamente`;
                    SuccessResponse(res, 200, message, type);
                })
                .catch((error) => {
                    errorResponses[error.name](res, error);
                });
        },

        remove(req: Request, res: Response) {
            const removeExecution = remove.execute(req.params.id);
            removeExecution
                .then((type) => {
                    const message = `Tipo de convenio eliminado correctamente`;
                    SuccessResponse(res, 200, message, type);
                })
                .catch((error) => {
                    errorResponses[error.name](res, error);
                });
        },
    };
};
