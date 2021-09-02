const connection = require('./connection');
const mysql = require('mysql2');

function dbmake(connection) {
    let database = Object.assign({}, functions);
    database.connect = connection;
    return database;
}
const functions = {}

let db = dbmake(connection);
module.exports = db;