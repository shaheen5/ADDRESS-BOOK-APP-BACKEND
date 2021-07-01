/**********************************************************************************************************
 *  Execution    : 1. Default node with npm   cmd> npm server.js
                   2. If nodemon installed    cmd> nodemon start
 *
 * Purpose      : test cases for testing rest apis
 *
 * @description  :mocha & chai package need to be installed & required before execution of this file 
 *
 * @file        : test/apiTest.js
 * @overview    : tests the request send by client to handle errors 
 * @module      : test and authorize token for rest apis request and response 
 * @author      : Shaheen M.
 * @version     : 1.0
 * @since       : 29-06-2021
 **********************************************************************************************************/
let chai = require('chai');
let chaiHttp = require('chai-http');
//assertion style
var should = chai.should();
chai.use(chaiHttp);
let server = require('../server');
let testDataInput = require('../test/testData.json');
let userToken = '';

describe('Test APIs', () => {
    /**
    * test for POST user registration
    */
    describe("POST /registerUser", () => {
        it("It should POST new user", (done) => {
            const userDetails = testDataInput.registerUserData;
            chai.request(server)
                .post('/registerUser')
                .send(userDetails)
                .end((err, res) => {
                    res.should.have.status(201);
                    res.should.be.a('object');
                    res.body.should.have.property('success').eq(true);
                    res.body.should.have.property('message').eq("New User Registered !");
                    res.body.should.have.property('data');
                    done();
                });
        });

        it("It should not POST new user when first name is less than 3 characters", (done) => {
            const userDetails = testDataInput.registerUserDataWithFirstNameLessThan3Characters;
            chai.request(server)
                .post('/registerUser')
                .send(userDetails)
                .end((err, res) => {
                    res.should.have.status(400);
                    done();
                });
        });
    });
    /**
         * test for POST user login
         */
    describe("POST /login", () => {
        it("It should login user", (done) => {
            const loginDetails = testDataInput.loginData;
            chai.request(server)
                .post("/login")
                .send(loginDetails)
                .end((error, response) => {
                    response.should.have.status(200);
                    response.body.should.have.property('success').eq(true);
                    response.body.should.have.property('message').eq("User Login Successful");
                    response.body.should.have.property('data');
                    done();
                });
        });

        it("It should not login user for wrong email Id", (done) => {
            const loginDetails = testDataInput.registerUserDataWithFirstNameLessThan3Characters;
            chai.request(server)
                .post("/login")
                .send(loginDetails)
                .end((error, response) => {
                    response.should.have.status(400);
                    response.body.should.have.property('success').eq(false);
                    done();
                });
        });
    });

});