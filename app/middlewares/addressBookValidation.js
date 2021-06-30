/**********************************************************************************************************
 *  Execution    : 1. Default node with npm   cmd> npm server.js
                   2. If nodemon installed    cmd> nodemon start
 *
 * Purpose      : user input request validation for addressbook contacts
 *
 * @description  :joi package need to be installed & required before execution of this file 
 *
 * @file        : middlewares/addressBookValidation.js
 * @overview    : validates the addressbook data send as request to server 
 * @module      : validates input request against pre-defined object schema since users can send anything 
 * @author      : Shaheen M.
 * @version     : 1.0
 * @since       : 29-06-2021
 **********************************************************************************************************/
const joi = require('joi');

const addressBookObjectSchema = joi.object({
    firstName: joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),
    lastName: joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),
    address: joi.string()
        .min(3)
        .max(50)
        .pattern(new RegExp("^[a-zA-Z0-9-,/_: ]{3,50}$"))
        .required(),
    city: joi.string()
        .alphanum()
        .min(3)
        .max(20)
        .required(),
    state: joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),
    zipCode: joi.number()
        .integer()
        .min(6)
        .required(),
    phoneNumber: joi.number()
        .integer()
        .min(10)
        .required(),
    emailId: joi.string()
        .email()
        .required()
});
module.exports = addressBookObjectSchema;