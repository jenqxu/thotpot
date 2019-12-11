import React, { Component } from 'react';
import './App.css';
import Header from './components/Header'
import PostFeed from './components/PostFeed'
import HPEvent from './components/HPEvent'

class App extends Component {

  render() {
    return (

      <div className="App">
        <Header />
        <br/>
        <PostFeed/>

        <HPEvent />
      </div>

    );
  }
}

export default App;
