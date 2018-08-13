/* 
*Desarrollado por Toni Peral Para Cecotec
*/
import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';

import Login from './components/login/Login';
import Backend from './components/backend/';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title welcome">App Cecotec en ReactJs</h1>
        </header>
        <Switch>
          <Route path="/" component={Login} exact/>
          <Route path="/backend" component={Backend} />
        </Switch>
       
      </div>
      </BrowserRouter>
    );
  }
}

export default App;
