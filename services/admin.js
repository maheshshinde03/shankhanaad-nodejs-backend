const db = require('../config/db.config');

async function adminLogin(data) {
    return new Promise(function (resolve, reject) {
        db.query(
            'SELECT * FROM admin WHERE username = ? AND password = ? AND isActivated = ?', [data.username, data.password, 'T'], (err, rows) => {
                if (!err) {
                    if (rows.length > 0) {
                        resolve({ message: 'password matched', rows });
                    } else {
                        reject({ message: 'password does not match' });
                    }
                } else {
                    reject({ message: 'An error occurred while querying the database' });
                }
            });
    });
}

async function getAllUsers() {
    return new Promise((resolve, reject) => {
        db.query(`
       SELECT * FROM registration24;
       SELECT COUNT(*) AS totalMembers FROM registration24;
       SELECT COUNT(*) AS totalBoys FROM registration24 WHERE gender = 'male';
       SELECT COUNT(*) AS totalGirls FROM registration24 WHERE gender = 'female';`, (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
}



// async function getAllUsers() {
//     return new Promise((resolve, reject) => {
//       db.query(`
//         SELECT id, fullname, email, mobile, dob, gender FROM registration24;
//       `, (err, users) => {
//         if (err) {
//           return reject(err);
//         }
        
//         db.query(`
//           SELECT 
//             COUNT(*) AS totalMembers,
//             SUM(CASE WHEN gender = 'M' THEN 1 ELSE 0 END) AS totalBoys,
//             SUM(CASE WHEN gender = 'F' THEN 1 ELSE 0 END) AS totalGirls
//           FROM registration24;
//         `, (err, counts) => {
//           if (err) {
//             return reject(err);
//           }
  
//           resolve({ users, counts: counts[0] });
//         });
//       });
//     });
//   }

async function getUserData(data) {
    return new Promise(function (resolve, reject) {
        db.query(
            'select * from registration24 where id = ?',[data.id], (err, rows) => {
                if (!err) {
                    resolve(rows);
                } else {
                    resolve(null);
                }
            })
    })
}


module.exports = {
    adminLogin,
    getAllUsers,
    getUserData
}