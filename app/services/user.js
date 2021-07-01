/**********************************************************************************************************
 *  Execution    : 1. Default node with npm   cmd> npm server.js
                   2. If nodemon installed    cmd> nodemon start
 *
 * Purpose      : services layer handles the actual business logic of our application
 *
 * @description  :modules need to be required before execution of this file  
 *
 * @file        : services/user.js
 * @overview    : Performs tasks to interact with controller and model layer
 * @module      : calls functions from model layer which involves db operations & return response to controller  
 * @author      : Shaheen M.
 * @version     : 1.0
 * @since       : 29-06-2021
 **********************************************************************************************************/
const userModel = require('../models/user');
const helper = require('../middlewares/helper');

class UserService {

    /**
       * creates a new user 
       * @param {*} req (express property)
       * @param {*} res (express property)
       * @returns callback
       */
    registerUser = (userData, callback) => {
        try {
            userModel.addNewUser(userData, (error, data) => {
                return (error) ? callback(error, null) : callback(null, data);
            });
        } catch (error) {
            return callback(error, null);
        }
    }
    /**
      * login user details
      * @param {*} req (express property)
      * @param {*} res (express property)
      * @returns callback
      */
    userLogin = (loginDetails, callback) => {
        try {
            userModel.userLogin(loginDetails, (err, data) => {
                if (err) {
                    return callback(err, null);
                }
                if (helper.checkPassword(loginDetails.password, data.password)) {
                    const userToken = helper.getGeneratedToken(loginDetails);
                    return userToken ? callback(null, userToken) : callback("Error Generating Token", null);
                }
                return callback("Pasword is incorrect", null);
            });
        } catch (error) {
            return callback(error, null);
        }
    }
}
module.exports = new UserService();