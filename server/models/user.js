const db = require('../config/db');
const bcrypt = require('bcrypt');

const User = {
    async findOne(username) {
        return new Promise((resolve, reject) => {
          const sql = 'SELECT * FROM users WHERE username = ?';
          console.log('SQL Query:', sql);
          console.log('SQL Parameters:', [username]);

          db.get(sql, [username], (err, row) => {
            if (err) {
              console.error('Error finding user:', err);
              reject(err);
            } else {
              console.log('User found:', row);
              resolve(row);
            }
          });
        });
      },

  async save(user) {
    return new Promise((resolve, reject) => {
      const sql = 'INSERT INTO users (email, username, password) VALUES (?, ?, ?)';
      db.run(sql, [user.email, user.username, user.password], (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  },
};

module.exports = User;
