//import bcrypt  module
const bcrypt = require('bcrypt');

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
}
module.exports = new Helper();