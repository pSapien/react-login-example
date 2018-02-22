import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Form, FormGroup, Label, Input, Button, FormFeedback } from 'reactstrap';
import isEmail from 'validator/lib/isEmail';
import './login.css';

export default class FormState extends Component {
  state = {
    data: {
      email: '',
      password: ''
    },
    loading: false,
    errors: {},
    serverError: '',
    redirectTo: ''
  };

  handleSubmit = async event => {
    event.preventDefault();
    const { data } = this.state;

    const errors = this.validate(data);
    this.setState({ errors });

    if (Object.keys(errors).length === 0) {
      this.setState({ loading: true });

      try {
        const response = await this.props.submit(data);
        if (response) {
          this.setState({ redirectTo: '/dashboard', loading: false });
        }
      } catch (err) {
        this.setState({ serverError: err.message });
      }
    }
  };

  render() {
    const { data: { email, password }, errors, serverError, loading, redirectTo } = this.state;
    const { loadingButtonTextIndicator, buttonText } = this.props;

    if (redirectTo) {
      return <Redirect push to={redirectTo} />;
    }

    return (
      <Form className="auth-form" onSubmit={this.handleSubmit}>
        <div className="error-msg">{serverError}</div>

        <FormGroup>
          <Label for="email">Email</Label>
          <Input
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={this.handleChange}
            placeholder="example@xyz.com"
            valid={errors.email ? false : true}
          />
          <FormFeedback>{errors.email}</FormFeedback>
        </FormGroup>

        <FormGroup>
          <Label for="password">Password</Label>
          <Input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={this.handleChange}
            placeholder="Enter your password"
            valid={errors.password ? false : true}
          />
          <FormFeedback>{errors.password}</FormFeedback>
        </FormGroup>

        <Button className="btn btn-primary-action">{loading ? loadingButtonTextIndicator : buttonText}</Button>
      </Form>
    );
  }

  handleChange = event =>
    this.setState({
      data: { ...this.state.data, [event.target.name]: event.target.value },
      errors: { ...this.state.errors, [event.target.name]: '' },
      serverError: ''
    });

  validate = data => {
    const errors = {};

    if (!isEmail(data.email)) errors.email = 'Invalid email';
    if (!data.password) errors.password = 'Required';
    if (!data.email) errors.email = 'Required';
    if (data.password.length > 0 && data.password.length < 6) errors.password = 'Minimum of 6 characters required';

    return errors;
  };

  componentWillUnmount() {
    this.setState({ serverError: '' });
  }
}
