/**********************************************************************************************************
 *  Execution    : 1. Default node with npm   cmd> npm server.js
                   2. If nodemon installed    cmd> nodemon start
 *
 * Purpose      : define user schema for database , use mongoose methods to perform db operations 
 *
 * @description  :modules need to be required before execution of this file  
 *
 * @file        : models/user.js
 * @overview    : Provides schema for database and performs mongoose CRUD operations
 * @module      : neccessary to define user schema for database ,define functions accessed by services layer  
 * @author      : Shaheen M.
 * @version     : 1.0
 * @since       : 29-06-2021
 **********************************************************************************************************/
const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        validate: /^[a-zA-Z]{3,20}$/
    },
    lastName: {
        type: String,
        required: true,
        validate: /^[a-zA-Z]{3,20}$/
    },
    emailId: {
        type: String,
        validate: /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9]+[.]+[a-zA-Z]+$/,
        unique: true
    },
    password: {
        type: String,
        required: true,
        validate: /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/
    }
}, {
    timestamps: true
});

const User = mongoose.model('User', userSchema);

class UserRegistrationAndLogin {
    /**
        * @description adNewUser method is to save the new User Data in database
        * @param userdData is data sent from Services layer
        * @return callback is used to callback Services includes error message or data
        */
    addNewUser = (userData, callback) => {
        try {
            //create new user
            const user = new User({
                firstName: userData.firstName,
                lastName: userData.lastName,
                emailId: userData.emailId,
                password: userData.password
            });
            user.save((error, userData) => {
                return (error) ? callback(error, null) : callback(null, userData);
            });
        } catch (error) {
            return (error, null);
        }
    }
}
module.exports = new UserRegistrationAndLogin();