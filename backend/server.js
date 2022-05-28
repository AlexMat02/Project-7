const mysql = require("mysql");
const dotenv = require("dotenv")
dotenv.config()
const connection = mysql.createConnection({
    host : process.env.mysqlHost,
    user : process.env.mysqlUser,
    password: process.env.mysqlPassword,
    database: process.env.mysqlDatabase
});

connection.connect((err) => {
    if (err) {
        throw err;
    }
    console.log("MySql Connected")
});

const app = require('./app');
app.set('port', process.env.PORT || 4000);

const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`listening on ${port}`);
});

/* 
Jean
a11

Azer@gmail.com
Azer123T!!
Didier

*/