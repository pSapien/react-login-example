import React, { Component } from 'react';
import { Button } from 'reactstrap';

import FormState from './FormState';
import api from '../../services/auth';
import './login.css';

export default class Login extends Component {
  state = {
    showSignup: false
  };

  toggleSignup = () => {
    setTimeout(
      () =>
        this.setState({
          showSignup: !this.state.showSignup
        }),
      500
    );
  };

  render() {
    const { showSignup } = this.state;
    return (
      <div className="container">
        <Button onClick={this.toggleSignup}> {showSignup ? 'LOG IN' : 'SIGN IN'}</Button>
        {showSignup ? (
          <FormState submit={api.register} loadingButtonTextIndicator="SIGNING IN" buttonText="SIGN IN" />
        ) : (
          <FormState submit={api.login} loadingButtonTextIndicator="LOGGING IN" buttonText="LOG IN" />
        )}
      </div>
    );
  }
}
