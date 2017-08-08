import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Login from './components/Login';
import Dashboard from './components/Dashboard';

const App = () =>
  <Router>
    <div className="app">
      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/dashboard" component={Dashboard} />
      </Switch>
    </div>
  </Router>;

export default App;
