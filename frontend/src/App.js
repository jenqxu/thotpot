import React, { Component } from 'react';
import './App.css';
import Header from './components/Header'
import PostFeed from './components/PostFeed'
import HPEvent from './components/HPEvent'
import EventFeed from './components/EventFeed'

class App extends Component {

  render() {
    return (

      <div className="App">
        <Header />
        <br/>
        <br/>
        <PostFeed/>

        <HPEvent />
        <EventFeed />
      </div>

    );
  }
}

export default App;
