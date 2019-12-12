import express from "express";
import {parseGet} from "../middlewares/parse_get";
import {parsePost} from "../middlewares/parse_post";
import {parseDelete} from "../middlewares/parse_delete";
import {authenticateUser} from "../middlewares/auth";

export const router = express.Router();
export const prefix = '/private';

const {privateStore} = require('../data/DataStore');

/**
 * Every request to this route needs
 * to be made from an authenticated user.
 */
router.use(authenticateUser);

router.get('/events', parseGet, function (req, res) {
  const result = req.handleGet(privateStore);
  if (typeof result !== 'undefined') {
    res.send({result})
  }
});

router.get('/events/:event', parseGet, function (req, res) {
  const result = req.handleGet(privateStore);
  if (typeof result !== 'undefined') {
    res.send({result})
  }
});


router.post('/create', parsePost, function (req, res) {
  
  /*
  const result = req.handlePost(privateStore);
  if (typeof result !== 'undefined') {
    res.send({result})
  }
  */

  
  const result = req.handlePost(privateStore);

  if (!req.body.host || !req.body.eventName) {
  res.status(401).send({msg: 'Expected a payload of host name and event name.'});
  return;
  }

  const host = req.body.host.toLowerCase();
  const eventName = req.body.eventName.toLowerCase();

  //Create or add unique events to a host
  privateStore.set(`events.${host}-${eventName}`,
    {
    host: req.body.host,
    eventName: req.body.eventName,
    data: req.body.data,
    }
  );

  //res.send({data: userFilter(accountStore.get(`users.${name}`)), status: 'Successfully made account'});
  res.send({result});  
    

});

router.delete('/*', parseDelete, function (req, res) {
  const result = req.handleDelete(privateStore);
  if (typeof result !== 'undefined') {
    res.send({result})
  }
});
