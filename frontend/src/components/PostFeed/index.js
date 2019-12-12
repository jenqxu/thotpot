import React, { Component } from 'react';
import { CardDeck, Navbar, Dropdown } from 'react-bootstrap';
import './PostFeed.css'
import PublicPost from '../PublicPost';
import PrivatePost from '../PrivatePost';
import axios from 'axios';


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

    if (!authtoken) {
      //Get events from Public data store
      axios.get('http://localhost:9000/public/events').then(res => {
        console.log('Got events - public');
        //this keeps the order of events made (like twitter, most recent)

        let pubPosts = [];
        for (let [key, value] of Object.entries(res.data.result)) {
          pubPosts.push(value);
        }
        this.setState({ posts: pubPosts });

      }).catch(error => { alert(error) });
    }

    if (authtoken) {
      //Get events from Private data store
      axios.get('http://localhost:9000/private/events', {
        'headers': { Authorization: `Bearer ${authtoken}` }
      }).then(res => {
        console.log('Got events - private');

        let privPosts = [];
        for (let [key, value] of Object.entries(res.data.result)) {
          privPosts.push(value);
        }
        this.setState({ posts: privPosts });

      }).catch(error => { alert(error) });
    }
  }

  handleDeletePost = () => {
    console.log("delete post");
    axios.delete(`http://localhost:9000/public/yu`).catch(error => { alert('welp') });
  }

  componentDidMount() {
    this.handleFeed();
  }

  handleFirstPostedSort() {
    this.state.posts.reverse();
  }



  render() {
    return (
      <div>
        <Navbar style={{ justifyContent: 'flex-end', paddingRight: 75 }}>
          <Dropdown>
            <Dropdown.Toggle variant='outline-warning' id='dropdown-basic'>
              Sort By...
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item href='#/action-1' onClick={this.handleFirstPostedSort()}>Last Posted</Dropdown.Item>
              <Dropdown.Item href='#/action-2' onClick={this.handleFirstPostedSort()}>First Posted</Dropdown.Item>
              <Dropdown.Item href='#/action-3'>Soonest</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Navbar>
        <CardDeck className='main'>
          {(() => {
            if (!localStorage.getItem('JWT')) {
              return this.state.posts.slice(0).reverse().map(post => (
                <PublicPost
                  hostName={post.host}
                  name={post.eventName}
                  description={post.data.description}
                  date={post.data.date}
                />
              ))
            } else {
              return this.state.posts.slice(0).reverse().map(post => (
                <PrivatePost
                  hostName={post.host}
                  name={post.eventName}
                  description={post.data.description}
                  membersGoing = {post.data.membersGoing}
                  date={post.data.date}
                />
              ))
            }
          })()}
        </CardDeck>
      </div>
    );
  }
}

export default PostFeed;