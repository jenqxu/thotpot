import React, { Component } from 'react';
import { CardDeck, Dropdown } from 'react-bootstrap';
import './PostFeed.css'
import Post from '../Post';

class PostFeed extends Component {
  constructor(props) {
    super(props);
  }



  render() {
    return (
      <div>
        <Dropdown>
          <Dropdown.Toggle variant='outline-dark' id='dropdown-basic'>
            Sort By
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item href='#/action-1'>Latest</Dropdown.Item>
            <Dropdown.item href='#/action-2'>Soonest</Dropdown.item>
          </Dropdown.Menu>
        </Dropdown>

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
      </div>
    );
  }
}

export default PostFeed;