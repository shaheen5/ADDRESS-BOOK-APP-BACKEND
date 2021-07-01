//import bcrypt  module
const bcrypt = require('bcrypt');
//import jwt module
const jwt = require('jsonwebtoken');

class Helper {
    /**
   * Method to compare given password and actual password stored in the database.
   * @param {*} userEnteredPassword password string provided by the user
   * @param {*} passwordInDB hashed password stored in the database
   * @returns boolean
   */
    checkPassword(userEnteredPassword, passwordInDB) {
        return userEnteredPassword && passwordInDB
            ? (bcrypt.compareSync(userEnteredPassword, passwordInDB))
            : false;
    }
    /**
  * Method For Token generation
  * @param {object} userData data from client/user
  * @returns token
  */
    getGeneratedToken(userData) {
        try {
            const token = jwt.sign(userData, process.env.SECRET_KEY, {
                expiresIn: '200000000s',
            });
            return token;
        } catch (error) {
            console.error();
        }
    }
    /**
   * To authenticate token
   * @param {*} req (express property)
   * @param {*} res (express property)
   * @param {*} next (express property)
   * @returns HTTP status and object
   */
    authenticateToken(req, res, next) {
        const token = req.headers.authorization;
        if (token) {
            jwt.verify(token.split(" ")[1], process.env.SECRET_KEY, (err) => {
                if (err) {
                    return res.status(500).send({
                        success: false,
                        message: err.message || 'Failed To Authenticate Token!',
                    });
                } else {
                    next();
                }
            });
        } else {
            return res.status(401).send({
                success: false,
                message: 'Unauthorized User!',
            });
        }
    }
}
module.exports = new Helper();