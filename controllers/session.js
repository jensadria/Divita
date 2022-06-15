const express = require('express');
const router = express.Router();
const db = require('../db/db');
const bcrypt = require('bcrypt');

function isValidPassword(plainTextPassword, passwordHash) {
  // Returns true or false
  return bcrypt.compareSync(plainTextPassword, passwordHash);
}

router.post('/', (req, res) => {
  // get login and pw from the body of the request
  console.log(req.body);
  const { type, username, password } = req.body;
  //check the login and pw with the DB and set the session
  //  console.log(login);
  let sql = '';
  if (type === 'parent') sql = 'SELECT * from parents WHERE login_name = $1';
  if (type === 'kid') sql = 'SELECT * from kids WHERE login_name = $1';

  db.query(sql, [username])
    .then((dbResult) => {
      const user = dbResult.rows[0];

      if (username == dbResult.rows[0].login_name) {
        if (isValidPassword(password, dbResult.rows[0].password_hash)) {
          req.session.type = type;
          req.session.userId = user.id;
          req.session.username = username;
          res.json({ success: true });
        } else {
          res.status(400).json({ message: 'password is incorrect' });
        }
      }
    })
    .catch((err) => {
      res.status(400).json({ message: 'login is incorrect' });
    });
});

router.get('/', (req, res) => {
  res.json(req.session);
});

router.delete('/', (req, res) => {
  req.session.destroy();
  res.json({ success: true });
});

module.exports = router;
