const jwt = require('jsonwebtoken');
const { JWT_KEY } = require('../config/serverConfig');
const bcrypt = require('bcrypt');
const AppErrors = require('../utils/error-handler');

const  UserRepository  = require('../repository/user-repository');


class UserService{
    constructor(){
        this.userRepository = new UserRepository();
    }


    async create(data) {
        try {
            const user = await this.userRepository.create(data);
            return user;
        } catch (error) {
            if(error.name == 'SequelizeValidationError'){
                throw error;
            }
            console.log("Something went wrong in service layer");
            // throw new AppErrors(
            //     'ServerError', 
            //     'Something went wrong in service',
            //     'Logical Issue found',
            //      500
            // )
            throw error;
        }
    }


    async signIn(email, plainPassword) {
        try {
            // setp 1 -> fetch the user using email
            const user = await this.userRepository.getByEmail(email);
            // step 2 -> compare incoming plain password with encrypted password
            const passwordMatch = this.checkPassword(plainPassword, user.password);
            if(!passwordMatch) {
                console.log("Password doesn't match");
                throw {error: 'Incorrect password'};
            }
            // step 3 -> if password match, create a token and send to the user
            const newJWT = this.createToken({email: user.email, id: user.id});
            return newJWT;
        } catch (error) {
          console.log("Something went wrong in signIn process");
          throw error;
        }
      }


    async destroy(userId){
        try {
            await this.userRepository.destroy(userId);
            return true;
        } catch (error) {
            console.log("Something went wrong in service layer");
            throw error;
        }
    }


    createToken(user) {
        try {
            const result = jwt.sign(user, JWT_KEY, {expiresIn: '1d'});
            return result;
        } catch (error) {
            console.log("Something went wrong while creating token");
            throw error;
        }
    }

    verifyToken(token) {
        try {
            const response = jwt.verify(token, JWT_KEY);
            return response;
        } catch (error) {
            console.log("Something went wrong in token validation",error);
            throw error;
        }
    }


    checkPassword(userInputPlainPassword, encryptedPassword) {
        try {
            return bcrypt.compareSync(userInputPlainPassword, encryptedPassword)
        } catch (error) {
            console.log("Something went wrong in password comparison",error);
            throw error;
        }
    }


    async isAuthenticated(token) {
        try {
            
            const response = this.verifyToken(token);
            if(!response) {
                throw {error: 'Invalid token'}
            }
            const user = this.userRepository.getById(response.id);
            if(!user){
                throw {error: 'No user with the corresponding token exists'};
            }
            return user.id;
        } catch (error) {
            console.log("Something went wrong in auth process",error);
            throw error;
        }
    }


    async isAdmin(userId) {
        try {
            return this.userRepository.isAdmin(userId);

        } catch (error) {
            console.log("Something went wrong in user Service",error);
            throw error;
        }
    }
}

module.exports = UserService;