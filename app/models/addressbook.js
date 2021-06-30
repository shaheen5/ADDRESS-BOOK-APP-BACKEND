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
        validate: /^[a-zA-Z0-9-,/_:]{3,50}$/
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
        validate: /^[a-zA-Z]{3,20}$/
    },
    emailId: {
        type: String,
        validate: /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9]+[.]+[a-zA-Z]+$/,
        unique: true
    }
}, {
    timestamps: true
});

const AddressBook = mongoose.model('AddressBook',addressBookSchema);