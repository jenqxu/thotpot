import React, { Component } from 'react';
import './App.css';
import Header from './components/Header'
import HPEvent from './components/HPEvent'
import PostFeed from './components/PostFeed'
 
class App extends Component {
 
 render() {
   return (
 
     <div className="App">
       <Header />
       <br/>
       <br/>
       <PostFeed/>
       <HPEvent />
     </div>
 
   );
 }
}
 
export default App;
