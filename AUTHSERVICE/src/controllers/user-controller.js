const { UserService } = require('../services')
const userService = new UserService()
const create = async (req, res) => {
    try {
        const response = await userService.create({
            email: req.body.email,
            password: req.body.password
        })
        return res.status(201).json({
            data: response,
            message: 'successfully created a new user',
            success: true,
            error: {}
        })
    } catch (error) {
        return res.status(error.statusCode).json({
            data: {},
            message: error.message,
            success: false,
            error: error.explaination
        })
    }
}
const signIn = async (req, res) => {
    try {
        const response = await userService.signIn(req.body.email, req.body.password)
        return res.status(201).json({
            data: response,
            message: 'successfully signed in',
            success: true,
            error: {}
        })
    } catch (error) {
        return res.status(error.statusCode).json({
            data: {},
            message: error.message,
            success: false,
            error: error.explaination
        })
    }
}
const isAuthenticated = async (req, res) => {
    try {
        const token = req.headers['x-access-token']
        const response = await userService.isAuthenticated(token)
        return res.status(201).json({
            data: response,
            message: 'user is authentucated and token is valid',
            success: true,
            error: {}
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            data: {},
            message: 'something went wrong',
            success: false,
            error: { error }
        })
    }
}
const isAdmin = async (req, res) => {
    try {
        const response = await userService.isAdmin(req.body.id)
        return res.status(200).json({
            data: response,
            message: 'suucessfully fetched whether user is admin or not',
            success: true,
            error: {}
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            data: {},
            message: 'something went wrong',
            success: false,
            error: { error }
        })
    }
}
module.exports = {
    create,
    signIn,
    isAuthenticated,
    isAdmin
}