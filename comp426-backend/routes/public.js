import express from "express";
import {parseGet} from "../middlewares/parse_get";
import {parsePost} from "../middlewares/parse_post";
import {parseDelete} from "../middlewares/parse_delete";

export const router = express.Router();
export const prefix = '/public';

const {publicStore} = require('../data/DataStore');


router.get('/*', parseGet, function (req, res) {
  const result = req.handleGet(publicStore);
  if (typeof result !== 'undefined') {
    res.send({result})
  }
});

/**
 * given host and event name
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

  
 if (!req.body.host || !req.body.eventName) {
  res.status(401).send({msg: 'Expected a payload of host name and event name.'});
  return;
  }

  const host = req.body.host.toLowerCase();
  const eventName = req.body.eventName.toLowerCase();

  let user = publicStore.get(`events.${host}`);
  //If host has already set up an event before, append the new event
  if(user){
    

  } else { //if host has not created an event before, set up the new event
    publicStore.set(`events.${host}`,
    [
      {
      eventName: req.body.eventName,
      data: req.body.data
      }
    ]);
  }


  //Create or add events to a host
  publicStore.set(`events.${host}`,
  [
    {
    eventName: req.body.eventName,
    data: req.body.data
    }
  ]);

  /*
  let user = publicStore.get(`events.${host}`);
  if (user) {
    //res.status(401).send({msg: `Host '${req.body.host}' already has an event.`});
    //return;
    //if Host already has an event set up, add a new event

    publicStore.set()


  } else {
      //if Host already has no events set up, create a new event
      publicStore.set(`events.${host}`,
      [
        {
        eventName: req.body.eventName,
        data: req.body.data
        }
      ]
  );
  */



  
  
  //res.send({data: userFilter(accountStore.get(`users.${name}`)), status: 'Successfully made account'});
  res.send({message:"work?"});
  

});

router.delete('/*', parseDelete, function (req, res) {
  const result = req.handleDelete(publicStore);
  if (typeof result !== 'undefined') {
    res.send({result})
  }
});
