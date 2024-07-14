class ApiError extends Error {
    public statusCode: number;

    constructor(statusCode: number, message: string) {
        super(message);
        this.statusCode = statusCode;
        Error.captureStackTrace(this, this.constructor);
    }

    static badRequest(msg: string) {
        return new ApiError(400, msg);
    }

    static unauthorized(msg: string) {
        return new ApiError(401, msg);
    }

    static notFound(msg: string) {
        return new ApiError(404, msg);
    }

    static internal(msg: string) {
        return new ApiError(500, msg);
    }
}
export default ApiError;