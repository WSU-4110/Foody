import './App.css';
import Login from './components/Login'
import Footer from './components/Footer'
import Register from './components/Register';
import {Route, Link} from 'react-router-dom'
import { useState } from 'react';
import HomePage from './components/HomePage';

function App() {

  return (
    <div className="App">
        <Route exact path="/" component={Login} />
        <Route exact path="/components/Register.js" component={Register} />
        <Route exact path="/components/HomePage.js" component={HomePage} />
        <Route exact path="/components/Footer.js" component={Footer} />

        {/* <Login /> */}

      
    </div>
  );
}

export default App;
