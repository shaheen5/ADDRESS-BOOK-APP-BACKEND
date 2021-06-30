/**********************************************************************************************************
 *  Execution    : 1. Default node with npm   cmd> npm server.js
                   2. If nodemon installed    cmd> nodemon start
 *
 * Purpose      : controller handles request and responses of addressbook CRUD operations
 *
 * @description  :modules need to be required before execution of this file 
 *
 * @file        : controllers/addressBook.js
 * @overview    : Handles requests coming from clients for Create,Update,Delete,Put & Get Addressbook Details 
 * @module      : neccessary part (controller) of MVC Model of AddressBook API
 * @author      : Shaheen M.
 * @version     : 1.0
 * @since       : 29-06-2021
 **********************************************************************************************************/
const addressBookService = require('../services/addressBook');

class AddressBookController {
    /**
  * function to validate request body received from client and call service createNewContact function
  * @param {*} req (express property)
  * @param {*} res (express property)
  * @returns HTTP status and object
  */

    createNewContact = (req, res) => {
        try {
            //check whether request body input length is 4 
            if (Object.keys(req.body).length != 8) {
                return res.status(400).send({ success: false, message: "Invalid Input!" });
            }

            addressBookService.addNewContact(req.body, (error, resultData) => {
                if (error) {
                    return res.status(500).send({
                        success: false,
                        message: error.message || "Some error occurred while creating Contact."
                    });
                }
                res.status(201).send({
                    success: true,
                    data: resultData,
                    message: "Contact Added Succesfully!"
                });
            });
        } catch (error) {
            return res.status(500).send({
                success: false,
                message: error.message
            });
        }
    }
}
module.exports = new AddressBookController();
