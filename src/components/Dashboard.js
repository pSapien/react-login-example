import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class Dashboard extends Component {
  state = { redirectTo: false, loggedIn: true };

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

  handleLogout = event => {
    event.preventDefault();
    this.setState({ redirectTo: '/', loggedIn: false });
  };

  render() {
    const { redirectTo } = this.state;
    if (redirectTo) {
      return <Redirect push to={redirectTo} />;
    }
    return (
      <button className="button" onClick={this.handleLogout}>
        LogOut
      </button>
    );
  }
}

export default Dashboard;
