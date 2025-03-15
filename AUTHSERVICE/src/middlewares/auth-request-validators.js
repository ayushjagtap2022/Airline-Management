const validateUserAuth = (req, res, next) => {
    if (!req.body.email || !req.body.password) {
        return res.status(400).json({
            success: false,
            data: {},
            message: "Somenthing went wrong",
            error: "Email or password missing in the request"
        })
    } else {
        next()
    }
}
const validateIsAdminRequest = (req, res, next) => {
    if (!req.body.id) {
        return res.status(400).json({
            success: false,
            data: {},
            message: "Somenthing went wrong",
            error: "User id not given"
        })
    }
    else {
        next()
    }
}
module.exports = {
    validateUserAuth,
    validateIsAdminRequest
}