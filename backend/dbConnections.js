var mysql = require('mysql');
var db = null;

module.exports = function() {
    if(!db) {
        db = mysql.createConnection({
            host : process.env.mysqlHost,
            user : process.env.mysqlUser,
            password: process.env.mysqlPassword,
            database: process.env.mysqlDatabase
        });
    }
    return db
};