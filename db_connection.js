const mysql = require('mysql');

const con = mysql.createConnection({
  host: "sql12.freesqldatabase.com",
  user: "sql12610675",
  password: "Ur7dybZJbp",
  database: "sql12610675"
});

module.exports = con;