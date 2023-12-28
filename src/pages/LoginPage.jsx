import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { login } from '../utils/network-data';
import { LoginInput } from '../components';
import { LocaleContext } from '../contexts';

export default function LoginPage({ loginSuccess }) {
  const { locale } = React.useContext(LocaleContext);

  async function onLogin({ email, password }) {
    const { error, data } = await login({ email, password });

    if (!error) {
      loginSuccess(data);
    }
  }

  return (
    <section className="login-page">
      <h2>{locale === 'id' ? 'Gunakan akun yang terdaftar!' : 'Use a registered account!'}</h2>
      <LoginInput login={onLogin} />
      <p>
        {locale === 'id' ? 'Belum punya akun' : "Don't have an account"} <NavLink to="/register">{locale === 'id' ? 'Daftar di sini' : 'Register here'}</NavLink>
      </p>
    </section>
  );
}

LoginPage.propTypes = {
  loginSuccess: PropTypes.func.isRequired,
};
