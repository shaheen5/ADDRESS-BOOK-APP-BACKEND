/**********************************************************************************************************
 *  Execution    : 1. Default node with npm   cmd> npm server.js
                   2. If nodemon installed    cmd> nodemon start
 *
 * Purpose      : define addressbook schema for database , use mongoose methods to perform db operations 
 *
 * @description  :modules need to be required before execution of this file  
 *
 * @file        : models/addressbook.js
 * @overview    : Provides schema for database and performs mongoose CRUD operations
 * @module      : neccessary to define addressbook schema for database ,define functions accessed by services layer  
 * @author      : Shaheen M.
 * @version     : 1.0
 * @since       : 29-06-2021
 **********************************************************************************************************/
const mongoose = require('mongoose');

const addressBookSchema = mongoose.Schema({
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
    address: {
        type: String,
        required: true,
        validate: /^[a-zA-Z0-9-,/_: ]{3,50}$/
    },
    city: {
        type: String,
        required: true,
        validate: /^[a-zA-Z]{3,20}$/
    },
    state: {
        type: String,
        required: true,
        validate: /^[a-zA-Z]{3,30}$/
    },
    zipCode: {
        type: Number,
        required: true,
        validate: /^[0-9]{6}$/
    },
    phoneNumber: {
        type: Number,
        required: true,
        validate: /^[6-9]{1}[0-9]{9}$/
    },
    emailId: {
        type: String,
        validate: /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9]+[.]+[a-zA-Z]+$/,
        unique: true
    }
}, {
    timestamps: true
});

const AddressBook = mongoose.model('AddressBook', addressBookSchema);

class AddressBookOperations {
    /**
        * @description addNewContactInbook method is to save the new Contact Data
        * @param addressBookData is data sent from Services layer
        * @return callback is used to callback Services includes error message or data
            */
    addNewContactInBook = (addressBookData, callback) => {
        try {
            const contact = new AddressBook({
                firstName: addressBookData.firstName,
                lastName: addressBookData.lastName,
                address: addressBookData.address,
                city: addressBookData.city,
                state: addressBookData.state,
                zipCode: addressBookData.zipCode,
                phoneNumber: addressBookData.phoneNumber,
                emailId: addressBookData.emailId
            });
            contact.save((error, addressBookData) => {
                return (error) ? callback(error, null) : callback(null, addressBookData);
            });
        } catch (error) {
            return callback(error, null);
        }
    }
    /**
        * @description retrive all the addressBook Data from database
        * @param callback is data sent from Service layer
        * @return callback is used to callback Services with data or error message
        */
    findAllContacts = (callback) => {
        try {
            AddressBook.find((error, addressBookData) => {
                return (error) ? callback(error, null) : callback(null, addressBookData);
            });
        } catch (error) {
            return callback(error, null);
        }
    }
}
module.exports = new AddressBookOperations();