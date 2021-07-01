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
    /**
    * before method to get user token after login
    */
    beforeEach((done) => {
        const userCredentials = testDataInput.loginData;
        chai.request(server)
            .post('/login')
            .send(userCredentials)
            .end((err, res) => {
                res.should.have.status(200);
                userToken = res.body.data;
                done();
            });
    });

    /**
     * test for GET route
     */
    describe("GET contacts", () => {
        it("It should GET all the contacts in addressbook", (done) => {
            chai.request(server)
                .get("/addressbook/getContacts")
                .set('Authorization', `Bearer ${userToken}`)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property('message').eq("Successfully Retrieved All Contacts !")
                    res.body.should.have.property('data').which.is.a('array');
                    done();
                });
        });

        it("It should NOT GET all the contacts for wrong url", (done) => {
            chai.request(server)
                .get("/addressbook/get/abc")
                .set('Authorization', `Bearer ${userToken}`)
                .end((err, res) => {
                    res.should.have.status(404);
                    done();
                });
        });
    });
    /**
    * test for POST route for contacts
    */
    describe("POST /addressbook/addContact", () => {
        it("It should add new contact", (done) => {
            const contact = testDataInput.addContactData;
            chai.request(server)
                .post('/addressbook/addContact')
                .send(contact)
                .set('Authorization', `Bearer ${userToken}`)
                .end((err, res) => {
                    res.should.have.be.a('object');
                    res.should.have.status(201);
                    res.body.should.have.property('success').eq(true);
                    res.body.should.have.property('message').eq("Contact Added Succesfully!");
                    res.body.should.have.property('data');
                    done();
                });
        });

        it("It should NOT POST new contact without the name property", (done) => {
            const contact = testDataInput.addContactDataWithoutName
            chai.request(server)
                .post('/addressbook/addContact')
                .send(contact)
                .set('Authorization', `Bearer ${userToken}`)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.have.property('success').eq(false);
                    res.body.should.have.property('message').eq("Invalid Input!");
                    done();
                });
        });

        it("It should NOT POST new contact with first name less than 3 characters", (done) => {
            const contact = testDataInput.addContactDataWithIncorrectFirstName
            chai.request(server)
                .post('/addressbook/addContact')
                .send(contact)
                .set('Authorization', `Bearer ${userToken}`)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.have.property('success').eq(false);
                    done();
                });
        });

    });
    /**
     * test for PUT route
     */
    describe("PUT /addressbook/updateContact/:contactID", () => {
        it("It should update contact details", (done) => {
            const contact = testDataInput.updateContactDetails;
            const id = testDataInput.updateContactId.id;
            chai.request(server)
                .put('/addressbook/updateContact/' + id)
                .send(contact)
                .set('Authorization', `Bearer ${userToken}`)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('success').eql(true);
                    res.body.should.have
                        .property('message')
                        .eql('Contact Details Updated Successfully!');
                    res.body.should.have.property('data').should.be.a('object');
                    done();
                });
        });

        it("It should NOT UPDATE contact details for wrong id", (done) => {
            const contact = testDataInput.updateContactDetailsWithWrongId
            const id = testDataInput.updateContactWrongId;
            chai.request(server)
                .put('/updatecontact/' + id)
                .send(contact)
                .set('Authorization', `Bearer ${userToken}`)
                .end((err, res) => {
                    res.should.have.status(404);
                    res.body.should.be.a('object');
                    if (err) done(err);
                    else done();
                });
        });
    });
    /**
     * test for GET one contact by id
     */
    describe("GET ONE contact /addressbook/getContact/:contactID", () => {
        it("It should retrieve contact details for given id", (done) => {
            const id = testDataInput.getContactDetailsId.id;
            chai.request(server)
                .get('/addressbook/getContact/' + id)
                .set('Authorization', `Bearer ${userToken}`)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('success').eql(true);
                    res.body.should.have
                        .property('message')
                        .eql("Found Contact Details successfully!");
                    res.body.should.have.property('data').should.be.a('object');
                    done();
                });
        });

        it("It should NOT GET contact details for wrong id", (done) => {
            const id = testDataInput.getContactDetailsWrongId.id;
            chai.request(server)
                .get('/addressbook/getContact/' + id)
                .set('Authorization', `Bearer ${userToken}`)
                .end((err, res) => {
                    res.should.have.status(404);
                    done();
                });
        });
    });

    /**
     * test for DELETE contact details
     */
    describe("DELETE /deleteContact/:contactID", () => {
        it("It should delete contact details", (done) => {

            const id = testDataInput.deletePersonId.id;
            console.log(id);
            chai.request(server)
                .delete('/addressbook/deleteContact/' + id)
                .set('Authorization', `Bearer ${userToken}`)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('success').eql(true);
                    done();
                });
        });

        it("It should NOT DELETE contact details for wrong id", (done) => {

            const id = testDataInput.deleteIncorrectId.id;
            chai.request(server)
                .put('/addressbook/deleteContact/' + id)
                .set('Authorization', `Bearer ${userToken}`)
                .end((err, res) => {
                    res.should.have.status(404);
                    done();
                });
        });
    });
});