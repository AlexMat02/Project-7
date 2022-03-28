const mysql = require("mysql");
const connection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password: 'password',
    database: 'mydb'
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