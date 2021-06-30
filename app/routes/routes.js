/**********************************************************************************************************
 *  Execution    : 1. Default node with npm   cmd> npm server.js
                   2. If nodemon installed    cmd> nodemon start
 *
 * Purpose      : define end points for our application 
 *
 * @description  :modules need to be required before execution of this file  
 *
 * @file        : routes/routes.js
 * @overview    : defines routes for login,registration and employee crud operation web pages
 * @module      :  use HTTP methods to send request to server 
 * @author      : Shaheen M.
 * @version     : 1.0
 * @since       : 29-06-2021
 **********************************************************************************************************/
const user = require('../controllers/user');
const addressBook = require('../controllers/addressBook');
module.exports = (app) => {
    // Create a new user
    app.post('/registerUser', user.registerUser);

    // login user
    app.post('/login', user.userLogin);

    //add new contact in addressbook
    app.post('/addressbook/addContact', addressBook.createNewContact);

    //get all contacts in addressbook
    app.get('/addressbook/getContacts', addressBook.getAllContacts);

    //get one contact by id
    app.get('/addressbook/getContact/:contactId', addressBook.findContactById);

    //delete contact by id
    app.delete('/addressbook/deleteContact/:contactId', addressBook.removeContactFromAddressbook);
}