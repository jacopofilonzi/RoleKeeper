// WARNING: this snippet has been designed to work on Node.js, you will need to install the right module using: "npm install mysql"
const mysql = require("mysql");

/**
 * Default authentication method
 * @typedef {Object} auth
 * @property {string} host - the host where you want to connect to
 * @property {string} user - the username used for the authentication
 * @property {string} password - the password used for the authentication
 * @property {string} [database] - the database to use in the connection (optional)
 */
const defaultAuth = {
  host: process.env.MYSQL_HOST,
  database: process.env.MYSQL_DATABASE,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD
};


/**
 * Asynchronous function for sending a custom query
 * @param {string} query - Query to execute
 * @param {Array.<string|number>} [params] - Parameters to send in the query (they will replace the question marks "?" in the query) (optional)
 * @param {auth} [auth] - Parameters for the connection to the database (optional)
 * @returns {Object} - returns the results and the fields of the query
 * @property {Array} results - the results given from the query
 * @property {Array} fields - the fields (or columns) used in the result of the query
 */
module.exports = async (query, params = [], auth = defaultAuth) => {

  // Create the instance for the connection
  const connection = mysql.createConnection(auth);

  // Connect to the database
  connection.connect();

  // Return a promise for the query
  return new Promise((resolve, reject) => {
    connection.query(query, params, (error, results, fields) => {

      // Close the connection to the database
      connection.end();

      if (error) // There was an error in the query
        reject(error);
      else // The query ran successfully
        resolve({ results: results, fields: fields });
    });
  });
}