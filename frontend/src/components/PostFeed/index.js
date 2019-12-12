import React, { Component } from 'react';
import { CardDeck, Dropdown } from 'react-bootstrap';
import './PostFeed.css'
import Post from '../Post';

import axios from 'axios';
import { Button } from 'react-bootstrap';


class PostFeed extends Component {

  constructor(props) {
    super(props);
    this.handleFeed = this.handleFeed.bind(this);
    this.state = {
      posts: new Array()
    }
  }


  handleFeed() {
    let authtoken = localStorage.getItem('JWT');

    //Get events from Public data store
    axios.get('http://localhost:9000/public/events').then(res => {
      alert('Got events - public');
      //this keeps the order of events made (like twitter, most recent)

      let pubPosts = [];
      for (let [key, value] of Object.entries(res.data.result)) {
        // let host = key;
        // let description = value['data']['description'];
        // let eventName = value['eventName'];
        // let date = value['data']['date'];

        pubPosts.push(value);
      }
      this.setState({posts: pubPosts});

      /* //sorts alphabetically by host name
      for (let key in res.data.result) {
          let event = res.data.result[`${key}`];
          let host = event['host'];
          let eventName = event['eventName'];
          let date = event['data']['date'];
      }
      */

    }).catch(error => { alert(error) });

    //Get events from Private data store
    axios.get('http://localhost:9000/private/events', {
      'headers': { Authorization: `Bearer ${authtoken}` }
    }).then(res => {
      alert('Got events - private');
    }).catch(error => { alert(error) });
  }

  handleDeletePost = () => {
    alert("delete post");
    axios.delete(`http://localhost:9000/public/yu`).catch(error => { alert('welp') });
  }

  componentDidMount() {
    this.handleFeed();
  }

  render() {
    // console.log(this.state.posts);

    return (
      <CardDeck className='main'>
        {this.state.posts.slice(0).reverse().map(post => (
            <Post
              hostName = {post.host}
              name = {post.eventName}
              description = {post.data.description}
              membersGoing = {3}
              date = {post.data.date}
            />
        ))
        }
      </CardDeck>
    );
  }
}

export default PostFeed;