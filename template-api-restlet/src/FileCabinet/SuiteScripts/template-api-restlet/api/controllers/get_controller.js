/**
 * @NApiVersion 2.1
 * @NModuleScope SameAccount
 */

define(["../../services/sales_order_service.js", "../../utils/response_handler.js", "../../utils/error.js"], (
    SalesOrderService,
    handleResponse,
    Error,
) => {
    const ACTIONS = {
        crear_orden: SalesOrderService.getAll,
    };

    const execute = (requestParams) => {
        return handleResponse(() => {
            const action = requestParams.action;

            if (!action || !ACTIONS[action]) {
                throw new Error.BadRequestError(`La acción "${action}" no es válida.`);
            }

            return ACTIONS[action](requestParams);
        });
    };

    return {
        execute,
    };
});
