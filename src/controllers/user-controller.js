const UserService = require('../services/user-service');


const userService = new UserService();

const create = async(req, res) => {
    try {
        const response = await userService.create({
            email: req.body.email,
            password: req.body.password
        });
        return res.status(201).json({
            success: true,
            data: response,
            message: 'Successfully created a new user',
            err: {}
        })
    } catch (error) {
        console.log(error);
        return res.status(error.statusCode).json({
            success: false,
            data: {},
            message: error.message,
            err: error.explanation
        });
    }
}


const signIn = async(req, res) => {
    try {
        const response = await userService.signIn(req.body.email, req.body.password);
        return res.status(200).json({
            success: true,
            data: response,
            message: 'Successfully Signed In',
            err: {}
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            data: {},
            message: 'Cannot signin user, Something went wrong in user controller',
            err: error
        });
    }
}


const isAuthenticated = async(req, res) => {
    try {
        const token = req.headers['x-access-token'];
        const response = await userService.isAuthenticated(token);
        return res.status(200).json({
            success: true,
            err: {},
            data: response,
            message: 'user is authenticated and token is valid'
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            data: {},
            message: 'Cannot authenticate user, Something went wrong in user controller',
            err: error
        });
    }
}


const isAdmin = async(req, res) => {
    try {
        const response = await userService.isAdmin(req.body.id);
        return res.status(200).json({
            data: response,
            err: {},
            success: true,
            message: 'Successfully fetched whether user is admin or not'
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            data: {},
            message: 'Cannot fetch whether user is admin or not',
            err: error
        });
    }
}

module.exports = {
    create,
    signIn,
    isAuthenticated,
    isAdmin
}