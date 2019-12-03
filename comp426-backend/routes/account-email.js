import express from "express";
import {authenticateUser} from "../middlewares/auth";
import bcrypt from 'bcrypt';
import {userFilter} from "../filters/user";
import jwt from 'jsonwebtoken';

export const router = express.Router();
export const prefix = '/account-email';

const saltRounds = 10;

const {accountStore} = require('../data/DataStore');

//jen try

/**
 * This route requires a valid JWT token.
 * This means that if you hit this route with a valid JWT then
 * you will be given the user data. If not, then you know you
 * know you are not logged in.
 */
router.get('/status', authenticateUser, function (req, res) {
  res.send(
    {
      user: {
        email: req.user.email,
        ...userFilter(accountStore.get(`users.${req.user.email}`))
      }
    }
  );
});

/**
 * Given a email and pass, validates a user
 * and returns a JWT.
 */
router.post('/login', async function (req, res) {
  if (!req.body.email || !req.body.pass) {
    res.status(401).send({msg: 'Expected a payload of email and pass.'});
    return;
  }

  const email = req.body.email.toLowerCase();
  const pass = req.body.pass;

  let user = accountStore.get(`users.${email}`);
  if (!user) {
    res.status(401).send({msg: `User '${req.body.email}' is not a registered user.`});
    return;
  }
  const result = await checkUser(email, pass);
  if (!result) {
    res.status(401).send({msg: 'Bad username or password.'});
    return;
  }
  let userData = accountStore.get(`users.${email}.data`);
  const token = jwt.sign({
    email,
    data: userData
  }, process.env.SECRET_KEY, {expiresIn: '30d'});

  res.send({jwt: token, data: userData, email});
});


/**
 * Given a email and pass, will create a user
 * if one with that email doesn't exist in the
 * database.
 */
router.post('/create', function (req, res) {

  if (!req.body.email || !req.body.pass) {
    res.status(401).send({msg: 'Expected a payload of email and pass.'});
    return;
  }

  const email = req.body.email.toLowerCase();
  const pass = req.body.pass;


  let user = accountStore.get(`users.${email}`);
  if (user) {
    res.status(401).send({msg: `User '${req.body.email}' is already a registered user.`});
    return;
  }

  bcrypt.hash(pass, saltRounds, (err, hash) => {
    accountStore.set(`users.${email}`, {
      passwordHash: hash,
      data: req.body.data
    });
    res.send({data: userFilter(accountStore.get(`users.${email}`)), status: 'Successfully made account'});
  });

});


async function checkUser(username, password) {
  const user = accountStore.get(`users.${username}`);
  return await bcrypt.compare(password, user.passwordHash);
}
