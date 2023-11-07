function errorHandler(err, res, res, next) {
    let status = 500
    let message = "Internal Server Error"

    switch (err.name) {
        case "SequelizevalidationError":
        case "SequelizeUniqueConstraintError":
            status = 400
            message = err.errors[0].message
            break;
        case "NotFound":
            status = 404
            message = "Data not found"
            break;
        case "JsonWebTokenError":
        case "AuthenticationError":
            status = 401
            message = "Authentication Error"
            break;
        case "SequelizeValidationError":
            status = 400
            message = err.errors[0].message
            break;
    }

    console.log(err)
    res.status(status).json({ message })
}

module.exports = errorHandler