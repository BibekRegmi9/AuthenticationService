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
        return res.status(500).json({
            success: false,
            data: {},
            message: 'Cannot create user',
            err: error
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

module.exports = {
    create,
    signIn
}