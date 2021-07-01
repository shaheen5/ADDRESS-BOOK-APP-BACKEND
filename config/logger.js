/**********************************************************************************************************
 *  Execution    : 1. Default node with npm   cmd> npm server.js
                   2. If nodemon installed    cmd> nodemon start
 *
 * Purpose      : Log info and error messages in log files
 *
 * @description  :winston package need to be installed & required before execution of this file 
 *
 * @file        : config/logger.js
 * @overview    : creates a logger to write logs into two log files 
 * @module      : logs error messages into error.log file & info messages in info.log 
 * @author      : Shaheen M.
 * @version     : 1.0
 * @since       : 29-06-2021
 **********************************************************************************************************/
const winston = require('winston');
module.exports.logger = winston.createLogger({
    'transports': [
        new winston.transports.File({
            level: 'info',
            filename: './logs/info.log',
            json: true,
            format: winston.format.combine(winston.format.timestamp(), winston.format.json())
        }),
        new winston.transports.File({
            level: 'error',
            filename: './logs/error.log',
            json: true,
            format: winston.format.combine(winston.format.timestamp(), winston.format.json())
        })
    ]
});