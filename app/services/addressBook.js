/**********************************************************************************************************
 *  Execution    : 1. Default node with npm   cmd> npm server.js
                   2. If nodemon installed    cmd> nodemon start
 *
 * Purpose      : services layer handles the actual business logic of our application
 *
 * @description  :modules need to be required before execution of this file  
 *
 * @file        : services/addressBook.js
 * @overview    : Performs tasks to interact with controller and model layer
 * @module      : calls functions from model layer which involves db operations & return response to controller  
 * @author      : Shaheen M.
 * @version     : 1.0
 * @since       : 29-06-2021
 **********************************************************************************************************/
const addressBookModel = require('../models/addressbook');

class AddressBookService {
    /**
      * creates an addressbook object by calling model methods and send response to control layer
      * @param {*} req (express property)
      * @param {*} res (express property)
      * @returns callback
      */
    addNewContact = (addressBookData, callback) => {
        try {
            addressBookModel.addNewContactInBook(addressBookData, (error, data) => {
                return (error) ? callback(error, null) : callback(null, data);
            });
        } catch (error) {
            return callback(error, null);
        }
    }
}
module.exports = new AddressBookService();