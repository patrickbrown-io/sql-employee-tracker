const mysql = require('mysql2');
const util = require('util');

let connection = mysql.createConnection({
    host: 'localhost',
    port: 3006,
    user: 'root',
    password: 1234,
    database: 'employees_db'
});

connection.connect();

connection.query = util.promisify(connection.query);

module.exports = connection;