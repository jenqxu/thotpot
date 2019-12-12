import express from "express";
import {parseGet} from "../middlewares/parse_get";
import {parsePost} from "../middlewares/parse_post";
import {parseDelete} from "../middlewares/parse_delete";

export const router = express.Router();
export const prefix = '/public';

const {publicStore} = require('../data/DataStore');


//gets actual events and all their children
router.get('/events', parseGet, function (req, res) {
  const result = req.handleGet(publicStore);
  if (typeof result !== 'undefined') {
    res.send({result})
  }
});

router.get('/:eventName', parseGet, function (req, res) {
  
  const result = req.handleGet(publicStore);
  if (typeof result !== 'undefined') {
    res.send({result});
  }
  

});

/**
 * given host and event name and data
 */
router.post('/create', parsePost, function (req, res) {
  /*
  const result = req.handlePost(publicStore);
  if (typeof result !== 'undefined') {
    res.send({result});
  }
  */
  

  /*
 const host = req.body.host;
 const eventName = req.body.eventName;
 console.log("host"+host+", event is "+eventName);
 res.end("yes");
 */

  const result = req.handlePost(publicStore);
 

 if (!req.body.host || !req.body.eventName) {
  res.status(401).send({msg: 'Expected a payload of host name and event name.'});
  return;
  }

  const host = req.body.host.toLowerCase();
  let eventName = req.body.eventName.toLowerCase();
  //eventName = encodeURIComponent(eventName.trim());

  //Create or add unique events to a host
  publicStore.set(`events.${host}-${eventName}`,
    {
    host: req.body.host,
    eventName: req.body.eventName,
    data: req.body.data,
    }
  );

  //res.send({data: userFilter(accountStore.get(`users.${name}`)), status: 'Successfully made account'});
  res.send({result});  

});

router.delete('/:eventName', parseDelete, function (req, res) {
  /*
  const result = req.handleDelete(publicStore);
  if (typeof result !== 'undefined') {
    res.send({result})
  }
  */

  const {eventName} = req.params;
  publicStore.del(`events.${eventName}`);
  res.send({status: `'${eventName}' deleted.`});

});
