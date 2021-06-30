/**********************************************************************************************************
 *  Execution    : 1. Default node with npm   cmd> npm server.js
                   2. If nodemon installed    cmd> nodemon start
 *
 * Purpose      : user input request validation for registration & login
 *
 * @description  :joi package need to be installed & required before execution of this file 
 *
 * @file        : middlewares/userCredentialsValidation.js
 * @overview    : validates the user data send as request to server 
 * @module      : validates input request against pre-defined object schema since users can send anything 
 * @author      : Shaheen M.
 * @version     : 1.0
 * @since       : 29-06-2021
 **********************************************************************************************************/
const joi = require('joi');

const userCredentialsSchema = joi.object({
    emailId: joi.string()
        .email()
        .required(),
    password: joi.string()
        .pattern(new RegExp("^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$"))
        .required()
});
module.exports = userCredentialsSchema;