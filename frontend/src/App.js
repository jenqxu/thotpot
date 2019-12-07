import React, { Component } from 'react';
import './App.css';
import Header from './components/Header'
import Post from './components/Post'
import HPEvent from './components/HPEvent'

class App extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = { apiResponse: "" };
  // }

  // callAPI() {
  //   fetch("http://localhost:9000/test")
  //       .then(res => res.text())
  //       .then(res => this.setState({ apiResponse: res }))
  //       .catch(err => err);
  // }

  // componentWillMount() {
  //   this.callAPI();
  // }

  render() { 
    return (
      // <div className="App">
      //   <header className="App-header">
      //     <img src={logo} className="App-logo" alt="logo" />
      //     <p>
      //       Edit <code>src/App.js</code> and save to reload.
      //     </p>
      //     <a
      //       className="App-link"
      //       href="https://reactjs.org"
      //       target="_blank"
      //       rel="noopener noreferrer"
      //     >
      //       Learn React
      //     </a>
      //   </header>
      //   <p className="App-intro">{this.state.apiResponse}</p>
      // </div>

      <div className = "App"> 
        <Header/>
        <Post />
        <HPEvent />
      </div>
      
    );
  }
}

export default App;
