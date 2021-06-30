/**********************************************************************************************************
 *  Execution    : 1. Default node with npm   cmd> npm server.js
                   2. If nodemon installed    cmd> nodemon start
 *
 * Purpose      : entry point for the program where express app is created
 *
 * @description  :Dependencies require to be installed before execution of this file 
 *
 * @file        : server.js
 * @overview    : Create web application using express,Set up the server,connect to database,define routes
 * @module      : starting point to run the AddressBook API
 * @author      : Shaheen M.
 * @version     : 1.0
 * @since       : 29-06-2021
 **********************************************************************************************************/

const express = require('express');
require('dotenv').config();

//create express app
const app = express();

//parse requests of content-type application/x-www-form-urlencoded
app.use(express.urlencoded({extended:true}))

// parse requests of content-type - application/json
app.use(express.json());

// Configuring the database
const dbConnect = require('./config/database');
dbConnect();

// Require routes
require('./app/routes/routes.js')(app);

//define a simple route
app.get('/',(req,res)=>{
    res.json({"message" : "Welcome To Address Book Application"});
});

app.listen(process.env.PORT,()=>{
    console.log(`Server is listening at port ${process.env.PORT}`);
});