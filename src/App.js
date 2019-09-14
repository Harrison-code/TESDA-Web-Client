import React from 'react';
import ApolloClient from 'apollo-boost';

import { BrowserRouter as Router, Route } from 'react-router-dom';

import Login from './pages/Login'
import Home from './pages/Home'
import Register from './pages/Register'


const client = new ApolloClient({
  uri: 'https://48p1r2roz4.sse.codesandbox.io',
});

const App = () => (
  <Router>
    <Route exact path="/" component={Home}/>
    <Route exact path="/login" component={Login}/>
    <Route exact path="/register" component={Register}/>
  </Router>
);

export default App
