define(['N/search', 'N/record'], function (search, record) {
    class SaleOrderRepository {
        static getAll() {
            return [
                {
                    id: 1,
                    name: 'Order 1',
                    description: 'Order 1 description',
                },
                {
                    id: 2,
                    name: 'Order 2',
                    description: 'Order 2 description',
                },
            ];
        }

        static create(payload) {
            return {
                id: 3,
                name: payload.name,
                description: payload.description,
            };
        }

        static update(payload) {
            return {
                id: payload.id,
                name: payload.name,
                description: payload.description,
            };
        }

        static delete(payload) {
            return {
                id: payload.id,
                name: payload.name,
                description: payload.description,
            };
        }
    }

    return SaleOrderRepository;
});
