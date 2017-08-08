import React, { Component } from 'react';
import Spinner from 'react-spinkit';
import styled from 'styled-components';
import { Redirect } from 'react-router-dom';

import { auth, fb } from '../firebase';

import './loginpage.css';

const Form = styled.form`
  border: 1px solid #cacaca;
  padding: 1rem;
  border-radius: 0;
  margin-right: auto;
  margin-left: auto;
  width: 800px;
  margin-top: 150px;
`;

class Login extends Component {
  state = {
    email: '',
    password: '',
    error: '',
    redirectTo: false,
    loading: false,
    user: null
  };
  componentDidMount() {
    const { history, location } = window;
    history.pushState(null, null, location.href);
    window.onpopstate = event => {
      event.preventDefault();
      history.go(1);
    };
  }
  handleKeyPress = event => {
    this.setState({ error: '' });
  };

  handleFacebookLogin = event => {
    event.preventDefault();
    auth
      .signInWithPopup(fb)
      .then(result => {
        //var token = result.credential.accessToken;
        var user = result.user;

        this.setState({ user, redirectTo: '/dashboard' });
        console.log(result);
        console.log({ user });
      })
      .catch(error => {
        console.log('Not Working');
      });
  };

  changeEmail = event => {
    event.preventDefault();
    this.setState({ email: event.target.value });
  };

  changePassword = event => {
    event.preventDefault();
    this.setState({ password: event.target.value });
  };

  handleLogin = event => {
    event.preventDefault();
    const { email, password } = this.state;
    this.setState({ error: '', loading: true });
    auth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ redirectTo: '/dashboard' });
      })
      .catch(() => {
        this.setState({
          error: 'Please check your email or password',
          loading: false
        });
      });
  };

  forgetPassword = event => {
    event.preventDefault();
    let { email } = this.state;

    if (email === '') {
      this.setState({ error: 'The Email field is empty' });
    } else {
      auth
        .sendPasswordResetEmail(email)
        .then(() =>
          this.setState({
            password: '',
            error: 'Email has been sent to change your password'
          })
        )
        .catch(() => console.log('Not Working'));
    }
  };

  renderButton() {
    if (this.state.loading) {
      return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Spinner name="line-scale-pulse-out-rapid" color="yellow" />;
        </div>
      );
    }
    return (
      <button
        style={{ margin: 5 }}
        className="button small-5 medium-5 large-5 align-center align-bottom cell"
        onClick={this.handleLogin}
      >
        LOG IN
      </button>
    );
  }

  render() {
    const { email, password, error, redirectTo } = this.state;

    if (redirectTo) {
      return <Redirect push to={redirectTo} />;
    }

    return (
      <div className="grid-x small-10 medium-6 large-3">
        <Form style={{ padding: 40 }} className="cell small-10 medium-6 large-3">
          <button style={{ lineHeight: 1.5 }} className="button cell" onClick={this.handleFacebookLogin}>
            Log in with Facebook
          </button>
          <p className="text-center"> or </p>
          <label>
            Email
            <input
              type="email"
              value={email}
              placeholder="somebody@example.com"
              onKeyPress={this.handleKeyPress}
              onChange={this.changeEmail}
            />
          </label>
          <label>
            Password
            <input
              type="password"
              value={password}
              onKeyPress={this.handleKeyPress}
              placeholder="Password"
              onChange={this.changePassword}
            />
          </label>
          <input type="checkbox" />
          <label>Remember Me</label>
          <div className="grid-x align-center">
            {this.renderButton()}
            <p style={{ fontSize: 10, cursor: 'pointer' }} className="text-center cell" onClick={this.forgetPassword}>
              Forgot your password
            </p>
          </div>

          <div id="error-style">
            {error}
          </div>
        </Form>
      </div>
    );
  }
}

export default Login;
