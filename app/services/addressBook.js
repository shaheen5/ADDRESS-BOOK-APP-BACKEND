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
const { logger } = require('../../config/logger');

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
                if (error) {
                    logger.error(error.message);
                    callback(error, null);
                }
                else {
                    logger.info(data);
                    callback(null, data);
                }
            });
        } catch (error) {
            logger.error(error.message);
            return callback(error, null);
        }
    }
    /**
  * /retrieve and return all contacts from the database.
  * @param {*} object
  */
    async findAllContacts() {
        try {
            const allContacts = await addressBookModel.findAllContacts();
            return allContacts;
        } catch (error) {
            logger.error(error.message);
            return error;
        }
    };

    /**
   * find a single employee with a contactId
   * @param {*} contactId path to the employee object
   * @param {*} callback callback function
   * @returns promise, object
   */
    findContactById = (contactId) => {
        try {
            return addressBookModel.findContactById(contactId)
                .then(addressBookData => {
                    if (!addressBookData) {
                        return "Data not found!";
                    } else {
                        logger.info(addressBookData);
                        return addressBookData;
                    }
                }).catch(error => {
                    logger.error(error.message);
                    return "Some error occured while retrieving contact"
                });
        } catch (error) {
            return error.message;
        }
    }
    /**
  * deletes addressbook data with id
  * @param {*} contactId path to the object
  * @param {*} callback callback function
  * @returns 
  */
    removecontactById = (contactId, callback) => {
        try {
            addressBookModel.removeContactById(contactId, (error, message) => {
                if (error) {
                    logger.error(error.message);
                    return callback(error, { "message": "Contact could not be deleted" });
                }
                else {
                    logger.info("Contact Deleted with contact id->", contactId);
                    return callback(null, { "message": "Contact was deleted successfully" });
                }
            });
        } catch (error) {
            return callback(error, null);
        }
    }
    /**
     * Updating employee data
     * @param {*} contactId id object
     * @param {*} addressBookData data object
     * @param {*} callback function
     */
    updateContactDetails = (contactId, addressBookData, callback) => {
        try {
            addressBookModel.updateContactById(contactId, addressBookData, (error, data) => {
                if (error) {
                    logger.error(error.message);
                    return callback(error, null);
                } else {
                    logger.info(data);
                    return callback(null, data);
                }
            });
        } catch (error) {
            logger.error(error.message);
            return callback(error, null);
        }
    };
}
module.exports = new AddressBookService();