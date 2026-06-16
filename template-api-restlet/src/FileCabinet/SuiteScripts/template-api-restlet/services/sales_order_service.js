define(['../repository/sale_order_repository'], function (SaleOrderRepository) {
    class SalesOrderService {
        static getAll() {
            return SaleOrderRepository.getAll();
        }
        static create(payload) {
            return SaleOrderRepository.create(payload);
        }
        static update(payload) {
            return SaleOrderRepository.update(payload);
        }
        static delete(payload) {
            return SaleOrderRepository.delete(payload);
        }
    }

    return SalesOrderService;
});
