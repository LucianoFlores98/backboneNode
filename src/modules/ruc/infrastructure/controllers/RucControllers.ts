import { Request, Response } from "express";
import { ErrorResponse, SuccessResponse } from "../../../../helpers/api";
import { createHashMap } from "../../../../helpers/utils";
import { IRucActions } from "../../core/actions/actionsProvider";
import { RucNotExistException } from "../../core/exceptions/RucNotExistException";

export const RucControllers = ({
    save,
    getAll,
}: IRucActions) => {
    const errorResponses = createHashMap(
        {
            [RucNotExistException.name]: (res: Response, error: Error) =>
                ErrorResponse(res, error, 404),
        },
        (res: Response, error: Error) => ErrorResponse(res, error)
    );

    return {
        save(req: Request, res: Response) {
            const saveExecution = save.execute(req.body);
            saveExecution
                .then((ruc) => {
                    const message = `Registro de RUC creado correctamente.`;
                    SuccessResponse(res, 201, message, ruc);
                })
                .catch((error) => {
                    errorResponses[error.name](res, error);
                });
        },

        getAll(req: Request, res: Response) {
            const getAllExecution = getAll.execute(req.query);
            getAllExecution
                .then((registers) => {
                    const message = `Registros de RUC obtenidos correctamente`;
                    SuccessResponse(res, 200, message, registers);
                })
                .catch((error) => {
                    errorResponses[error.name](res, error);
                });
        },
    };
};
