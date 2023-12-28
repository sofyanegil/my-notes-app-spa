import React from 'react';
import PropTypes from 'prop-types';
import useInput from '../hooks/useInput';
import Swal from 'sweetalert2';

export default function RegisterInput({ register }) {
  const [name, onNameChange] = useInput('');
  const [email, onEmailChange] = useInput('');
  const [password, onPasswordChange] = useInput('');
  const [confirmPassword, onConfirmPasswordChange] = useInput('');

  const onSubmitHandler = (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Password and Confirm Password must be same.',
        showConfirmButton: false,
        timer: 2000,
      });
      return;
    }

    register({
      name,
      email,
      password,
    });
  };

  return (
    <div className="input-register">
      <label htmlFor="name">Name</label>
      <input
        type="text"
        placeholder="Name"
        value={name}
        id="name"
        onChange={(event) => {
          onNameChange(event);
        }}
      />
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
      <label htmlFor="confirmPassword">Confirm Password</label>
      <input
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(event) => {
          onConfirmPasswordChange(event);
        }}
        id="confirmPassword"
      />

      <button type="button" onClick={(event) => onSubmitHandler(event)}>
        Register
      </button>
    </div>
  );
}

RegisterInput.propTypes = {
  register: PropTypes.func.isRequired,
};
