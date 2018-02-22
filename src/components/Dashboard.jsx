import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import api from '../services/auth';

class Dashboard extends Component {
  state = { redirectTo: false, loggedIn: true, loading: false };

  componentDidMount() {
    const { loggedIn } = this.state;
    const { history, location } = window;
    if (loggedIn) {
      history.pushState(null, null, location.href);
      window.onpopstate = event => {
        event.preventDefault();
        history.go(1);
      };
    }
  }

  handleLogout = async event => {
    event.preventDefault();

    try {
      const response = await api.logout();
      api.logout().then(response => console.log(response));
      console.log(response);
      if (response) {
        this.setState({ redirectTo: '/', loggedIn: false, loading: true });
      }
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    const { redirectTo } = this.state;

    if (redirectTo) {
      return <Redirect push to={redirectTo} />;
    }

    return (
      <button className="button" onClick={this.handleLogout}>
        LOGOUT
      </button>
    );
  }
}

export default Dashboard;
