const db = require('../config/db.config');

async function checkEmail(registration) {
    
    return new Promise(function (resolve, reject) {
        db.query(
            `SELECT * from registration24 WHERE email=?`, [registration.email],
            (error, rows) => {
                if (error) {
                    resolve('error');
                } else {
                    if (rows.length === 0) {
                        resolve('No records found');
                    } else {
                        resolve({ status: 'user id Exist' });
                    }
                }
            }
        );
    });
}

async function addUsers(user) {
    
    return new Promise(function (resolve, reject) {
        db.query("INSERT INTO registration24 (fullname, email, mobile, dob, gender, refName, instrument_type, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?)", [user.fullname, user.email, user.mobile, user.dob, user.gender, user.refName, user.instrument, user.createdAt],
            (error) => {
                if (error) {
                    
                    reject({ status: 'error', message: error.message });
                } else {
                    resolve({ status: 'OK' });
                }
            });
    });
}

module.exports = {
    checkEmail,
    addUsers
};
