const mysql = require('mysql2');

const connection = mysql.createConnection({
    // host: 'localhost',
    // user: 'root',
    // password: 'mahesh@28',
    // database: 'shankhanaad',
    // multipleStatements: true,
    host: 'shankhanaad-db.cxgu468qq1zy.ap-south-1.rds.amazonaws.com',
    user: 'admin',
    password: 'shankhanaad5002',
    database: 'shankhanaad',
    multipleStatements: true,
})
connection.connect((err) => {
    if (err) {
        
        console.error('error connecting:', err.stack);
    }
    else {
        
    }

});

module.exports = connection;

