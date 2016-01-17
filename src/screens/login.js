import React, { Component } from 'react';

import LoginFormContainer from '../containers/login';
import LoginForm from '../components/login-form';

// don't use pure function components for views or react-transform-hmr
// won't work for us (for now)
export default class Login extends Component {
  render () {
    return (
      <div className="container text-center">
        <h1>This is the login view!</h1>
        <p>email: "ok@example.com" password: "password"</p>
        <p>"boom" to break the server</p>
        <div className="text-left col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3 col-lg-offset-4 col-lg-4">
          <LoginFormContainer>
            <LoginForm />
          </LoginFormContainer>
        </div>
      </div>
    );
  }
}
