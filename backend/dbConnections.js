var mysql = require('mysql');
var db = null;

module.exports = function() {
    if(!db) {
        db = mysql.createConnection({
            host : 'localhost',
            user : 'root',
            password: 'password',
            database: 'mydb'
        });
    }
    return db
};