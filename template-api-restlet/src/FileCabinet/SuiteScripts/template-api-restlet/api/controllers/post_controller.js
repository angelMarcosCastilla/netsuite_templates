/**
 * @NApiVersion 2.1
 * @NModuleScope SameAccount
 */

define(['../../services/sales_order_service', '../../utils/response_handler'], (SalesOrderService, handleResponse) => {
    const ACTIONS = {
        crear_orden: SalesOrderService.getAll,
    };

    const execute = (requestBody) => {
        return handleResponse(() => {
            const action = requestBody.action;

            if (!action || !ACTIONS[action]) {
                throw {
                    name: 'INVALID_ACTION',
                    message: `La acción "${action}" no es válida.`,
                };
            }

            return ACTIONS[action](requestBody);
        });
    };

    return {
        execute,
    };
});
