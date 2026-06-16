define([], function () {
    class BaseError extends Error {
        details = null;
        constructor(message, details) {
            super(message);
            this.name = this.constructor.name;
            this.details = details;
        }
    }

    function createFactoryError({ name, code, status }) {
        return class extends BaseError {
            constructor(message, details) {
                super(message, details);
                this.name = name;
                this.code = code;
                this.status = status;
            }
        };
    }

    const BadRequestError = createFactoryError({
        name: "BadRequestError",
        code: "BAD_REQUEST",
        status: 400,
    });

    const UnauthorizedError = createFactoryError({
        name: "UnauthorizedError",
        code: "UNAUTHORIZED",
        status: 401,
    });

    const ForbiddenError = createFactoryError({
        name: "ForbiddenError",
        code: "FORBIDDEN",
        status: 403,
    });

    const NotFoundError = createFactoryError({
        name: "NotFoundError",
        code: "NOT_FOUND",
        status: 404,
    });

    const ConflictError = createFactoryError({
        name: "ConflictError",
        code: "CONFLICT",
        status: 409,
    });

    const InternalServerError = createFactoryError({
        name: "InternalServerError",
        code: "INTERNAL_SERVER_ERROR",
        status: 500,
    });

    return {
        BadRequestError,
        UnauthorizedError,
        ForbiddenError,
        NotFoundError,
        ConflictError,
        InternalServerError,
    };
});
