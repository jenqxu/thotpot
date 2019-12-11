import Post from '../Post'
import React, { Component } from "react";
import { Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';
 
//IMPORT RENDER POST 
class EventFeed extends Component {
   constructor(props){
       super(props);
       this.handleFeed = this.handleFeed.bind(this);
       this.state={}
   }
 
   handleFeed = event => {
        let authtoken = localStorage.getItem('JWT');

        //Get events from Public data store
       axios.get('http://localhost:9000/public/events').then(res => {
        alert('Got events - public');

            //this keeps the order of events made (like twitter, most recent)
        for (let[key, value] of Object.entries(res.data.result)){
            let host = value['host'];
            let eventName = value['eventName'];
            let date = value['data']['date'];
            
        }

        /* //sorts alphabetically by host name
        for (let key in res.data.result) {
            let event = res.data.result[`${key}`];
            let host = event['host'];
            let eventName = event['eventName'];
            let date = event['data']['date'];
        }
        */


       }).catch(error => {alert(error)});

       //Get events from Private data store
       axios.get('http://localhost:9000/private/events', {
        'headers': {Authorization: `Bearer ${authtoken}`}
        }).then(res => {
           //alert('Got events - private');
       }).catch(error => {alert(error)});
   }

   handleDeletePost = () => {
        alert("delete post");
        axios.delete(`http://localhost:9000/public/yu`).catch(error => {alert('welp')});
   }

 
   render() {
       return(
       <div className="Feed">
           <Button
              variant='outline-dark'
              className = "button-event"
              onClick={this.handleFeed}
              >
              test - feed
            </Button>      

            <Button
              variant='outline-dark'
              className = "button-event"
              onClick={this.handleDeletePost}
              style={{float: 'left'}}
              >
              test - delete post
            </Button>     

       </div>
   )}
}
 
export default EventFeed