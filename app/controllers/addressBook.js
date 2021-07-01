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
const addressbookValidator = require('../middlewares/addressBookValidation');

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
            //validate req body 
            let validationResult = addressbookValidator.validate(req.body);
            if (validationResult.error) {
                return res.status(400).send({
                    success: false,
                    message: validationResult.error.details[0].message
                });
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
    /**
   * function to call the findAllContacts function of service layer which retrives data from db
   * @param {*} req (express property)
   * @param {*} res (express property)
   * @returns HTTP status and object
   */
    getAllContacts = (req, res) => {
        try {
            addressBookService.findAllContacts((error, contacts) => {
                if (error) {
                    return res.status(500).send({
                        success: false,
                        message: error.message || "Some error occurred while retrieving contacts."
                    });
                }
                if (!contacts) {
                    return res.status(404).send("There are no contacts created yet!");
                }
                res.status(200).send({
                    success: true,
                    data: contacts,
                    message: "Successfully Retrieved All Contacts !"
                });
            });
        } catch (error) {
            return res.status(500).send({
                success: false,
                message: error.message
            });
        }
    };
    /**
 * function to call the findContactById function of service that gets the required addressbook data from db
 * @param {*} req (express property)
 * @param {*} res (express property)
 * @returns HTTP status and employee object
 */
    findContactById = (req, res) => {
        try {
            addressBookService.findContactById(req.params.contactId, (error, resultData) => {
                if (error) {
                    if (error.kind === 'ObjectId') {
                        return res.status(404).send({
                            success: false,
                            message: "Contact not found with id " + req.params.contactId
                        });
                    }
                    return res.status(500).send({
                        success: false,
                        message: "Error retrieving contact with id " + req.params.contactId
                    });
                }
                if (resultData) {
                    res.status(200).send({
                        success: true,
                        data: resultData,
                        message: "Found Contact Details successfully!"
                    });
                } else {
                    res.status(404).send({
                        succes: false,
                        message: "Data is not available for given id"
                    });
                }
            });
        } catch (error) {
            return res.send({ message: error.message });
        }
    };
    /**
    * function to call the deleteEmployee function of service layer that deletes
    *  the required employee data from the db 
    * @param {*} req (express property)
    * @param {*} res (express property)
    * @returns HTTP status and object
    */
    removeContactFromAddressbook = (req, res) => {
        try {
            addressBookService.removecontactById(req.params.contactId, (error, result) => {
                if (error) {
                    return res.status(500).send({
                        success: false,
                        message: "Error deleting contact with id "
                    });
                }
                res.status(200).send({
                    success: true,
                    message: result
                });
            });
        } catch (error) {
            return res.send({
                message: error.message
            });
        }
    };
     /**
   * function to call the update function that updates the required addressbook data from db
   * @param {*} req (express property)
   * @param {*} res (express property)
   * @returns HTTP status and object
   */
      updateContactDetails = (req, res) => {
        try {
             //check whether request body contains 8 input properties
             if (Object.keys(req.body).length != 8) {
                return res.status(400).send({ success: false, message: "Invalid Input!" });
            }
            addressBookService.updateContactDetails(req.params.contactId, req.body, (error, resultData) => {
                if (error) {
                    if (error.kind === 'ObjectId') {
                        return res.status(404).send({
                            message: "Contact not found with id " + req.params.contactId
                        });
                    }
                    return res.status(500).send({
                        message: "Error updating contact with id " + req.params.contactId
                    });
                }
                res.send({
                    success: true,
                    message: "Contact Details Updated Successfully!",
                    data: resultData
                });
            });

        } catch (error) {
            return res.send({
                success: false,
                message: error.message
            });
        }
    };

}
module.exports = new AddressBookController();
