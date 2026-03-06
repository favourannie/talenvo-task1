class AppError extends Error {
    constructor(message, statusCode) {
        super(message)
        this.statusCode = statusCode || 500
        Error.captureStackTrace(this, this.constructor)
    }
}

const globalErrorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500
    const message = err.message || "Internal Server Error"

    console.error(`[Error] ${message}`, err)

    if (res.headersSent) {
        return next(err)
    }

    res.status(statusCode).json({
        success: false,
        message,
        ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
    })
}

module.exports = { AppError, globalErrorHandler }
