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
module.exports = (app) => {
    const user = require('../controllers/users');

    // Create a new user
    app.post('/registerUser', user.registerUser);

    // login user
    app.post('/login', user.userLogin);

}