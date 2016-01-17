import React from 'react';

import Input from 'react-bootstrap/lib/Input';
import Button from 'react-bootstrap/lib/Button';
import Alert from 'react-bootstrap/lib/Alert';

/**
 * Login Form Component
 * @param   {Function} options.onInputChange
 * @param   {Function} options.handleSubmit
 * @param   {Object}   options.error
 * @param   {String}   options.error.message
 * @param   {String}   options.error.fields.email
 * @param   {String}   options.error.fields.password
 * @param   {Number}   options.error.server.status
 * @param   {String}   options.error.server.message
 * @param   {String}   options.email
 * @param   {String}   options.password
 * @param   {Boolean}  options.loggingIn
 * @returns {Component}
 */
const LoginForm = ({ email, password, emailAlert, passAlert, loggingIn, error, handleSubmit, onInputChange }) => (
  <form onSubmit={handleSubmit}>
    <Input label="Email" name="email" type="email" placeholder="email" onChange={onInputChange} value={email}
      bsStyle={emailAlert} hasFeedback={emailAlert ? true : false}
    />
    <Input label="Password" name="password" type="password" placeholder="password" onChange={onInputChange} value={password}
      bsStyle={passAlert} hasFeedback={passAlert ? true : false}
    />
    <div style={{ textAlign: 'right', marginBottom: '5px' }}>
      <Button active={loggingIn} onClick={handleSubmit}> Log In </Button>
    </div>
    {error.server && <Alert bsStyle="danger">{error.server.message}</Alert>}
    {error.fields && error.fields.email && <Alert bsStyle="warning">{error.fields.email}</Alert>}
    {error.fields && error.fields.password && <Alert bsStyle="warning">{error.fields.password}</Alert>}
  </form>
);

export default LoginForm;
