/**********************************************************************************************************
 *  Execution    : 1. Default node with npm   cmd> npm server.js
                   2. If nodemon installed    cmd> nodemon start
 *
 * Purpose      : controller handles request and responses of  user login & registartion
 *
 * @description  :modules need to be required before execution of this file 
 *
 * @file        : controllers/user.js
 * @overview    : Handles requests coming from clients to login & register 
 * @module      : neccessary part (controller) of MVC Model of employee Payroll API
 * @author      : Shaheen M.
 * @version     : 1.0
 * @since       : 29-06-2021
 **********************************************************************************************************/
const userService = require('../services/user');
const userValidator = require('../middlewares/userValidation');

class UserController {
    /**
        * function to validate req body and call service layer function registerUser to add new user in db
        * @param {*} req (express property)
        * @param {*} res (express property)
        * @returns HTTP status and object
        */
    registerUser = (req, res) => {
        try {
            //validate re body
            let validationResult = userValidator.validate(req.body);
            if (validationResult.error) {
                return res.status(400).send({
                    success: false,
                    message: validationResult.error.details[0].message
                });
            }

            userService.registerUser(req.body, (err, userData) => {
                if (err) {
                    return res.status(500).send({
                        sucess: false,
                        message: err.message || "Some error occurred while registering user."
                    });
                }
                res.status(201).send({
                    success: true,
                    data: userData,
                    message: "New User Registered !"
                });
            });

        } catch (error) {
            return res.send({ message: error.message })
        }
    }
}

module.exports = new UserController();