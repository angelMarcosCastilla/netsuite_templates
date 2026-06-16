define([], function () {
    return function handleResponse(fn) {
        const response = {
            success: true,
            statusCode: 200,
            data: null,
            error: null,
            message: 'Success',
        };

        try {
            const result = fn();

            response.data = result?.data ?? result;
            response.message = result?.message || 'Success';
        } catch (error) {
            log.error('handleResponse', error);
            response.success = false;
            response.statusCode = error.status || 500;
            response.error = {
                code: error.name || 'INTERNAL_ERROR',
            };
            response.message = error.message || 'Internal Server Error';
        }

        return response;
    };
});
