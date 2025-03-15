const { UserRepository } = require('../reposirtory')
const jwt = require('jsonwebtoken')
const bcryptjs = require('bcryptjs')
class UserService {
    constructor() {
        this.userRepository = new UserRepository()
    }
    async create(data) {
        try {
            const user = await this.userRepository.create(data)
            return user
        } catch (error) {
            if (error.name == 'SequelizeValidationError') {
                throw error
            }
            console.log("Something went wrong in service layer " + error);
            throw error
        }
    }
    createToken(user) {
        try {
            const result = jwt.sign(user, "computer", { expiresIn: '1day' })
            return result
        } catch (error) {
            console.log("Something went wrong in service layer" + error);
            throw error
        }
    }
    verifyToken(token) {
        try {
            const result = jwt.verify(token, "computer")
            return result
        } catch (error) {
            console.log("Something went wrong in service layer" + error);
            throw error
        }
    }
    async isAuthenticated(token) {
        try {
            const response = this.verifyToken(token)
            if (!response) {
                throw { error: "Invalid Token" }
            }
            const user = await this.userRepository.getById(response.id);
            if (!user) {
                throw { error: "No user with the corresponding token exists" }
            }
            return user.id
        } catch (error) {
            console.log("Something went wrong in service layer" + error);
            throw error
        }
    }
    async signIn(email, plainPassword) {
        try {
            const user = await this.userRepository.getByEmail(email)
            const passwordMatch = this.checkPassword(plainPassword, user.password)
            if (!passwordMatch) {
                console.log("Password doesn't match");
                throw { error: "Incorrect passsword" }
            }
            const newJWT = this.createToken({ email: user.email, id: user.id })
            return newJWT;
        } catch (error) {
            if (error.name == "AttributeNotFound") {
                throw error
            }
            console.log("Something went wrong in service layer" + error);
            throw error
        }
    }
    checkPassword(userInputPlainPassword, encryptedPassword) {
        try {
            return bcryptjs.compareSync(userInputPlainPassword, encryptedPassword)
        } catch (error) {
            console.log("Something went wrong in service layer" + error);
            throw error
        }
    }
    async isAdmin(userId) {
        try {
            return this.userRepository.isAdmin(userId)
        } catch (error) {
            console.log("Something went wrong in service layer" + error);
            throw error
        }

    }
}
module.exports = UserService