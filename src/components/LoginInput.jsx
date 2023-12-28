import React from 'react';
import PropTypes from 'prop-types';
import useInput from '../hooks/useInput';

export default function LoginInput({ login }) {
  const [email, onEmailChange] = useInput('');
  const [password, onPasswordChange] = useInput('');

  const onSubmitHandler = (event) => {
    event.preventDefault();

    login({
      email,
      password,
    });
  };

  return (
    <div className="input-login">
      <label htmlFor="email">Email</label>
      <input
        type="email"
        placeholder="Email"
        value={email}
        id="email"
        onChange={(event) => {
          onEmailChange(event);
        }}
      />
      <label htmlFor="password">Password</label>
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(event) => {
          onPasswordChange(event);
        }}
        id="password"
      />
      <button type="button" onClick={(event) => onSubmitHandler(event)}>
        Login
      </button>
    </div>
  );
}

LoginInput.propTypes = {
  login: PropTypes.func.isRequired,
};
