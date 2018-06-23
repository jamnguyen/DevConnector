import React, { Component } from 'react';
import './App.css';
import NavBar from './components/NavBar';
import Landing from './components/Landing';
import Footer from './components/Footer';

class App extends Component {
  render() {
    return (
      <div className="App">
        <NavBar />
        <Landing />
        <Footer />
      </div>
    );
  }
}

export default App;
