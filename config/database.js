/**********************************************************************************************************
 *  Execution    : 1. Default node with npm   cmd> npm server.js
                   2. If nodemon installed    cmd> nodemon start
 *
 * Purpose      : database connection 
 *
 * @description  :mongoose,winston,dotenv package need to be installed & required before execution of this file 
 *
 * @file        : config/database.js
 * @overview    : It uses mongoose to connect to mongo db database  and returns a connection handler
 * @module      :  connects to db,logs appropriate message to log files 
 * @author      : Shaheen M.
 * @version     : 1.0
 * @since       : 29-06-2021
 **********************************************************************************************************/
const mongoose = require('mongoose');
require('dotenv').config();

module.exports = () => {
    // Connecting to the database
    mongoose.connect(process.env.URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    }).then(() => {
        console.log("Successfully connected to the database");
    }).catch(err => {
        console.log('Could not connect to the database. Exiting now...', err);
        process.exit();
    });

    return mongoose.connection;
}