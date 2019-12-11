import React, { Component } from 'react';
import { CardDeck } from 'react-bootstrap';
import './PostFeed.css'
import Post from '../Post';

class PostFeed extends Component {
  render() {
    return (
      <CardDeck className='main'>
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
      </CardDeck>
    );
  }
}

export default PostFeed;