import React from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { HiLogout, HiArchive, HiMoon, HiSun, HiTranslate } from 'react-icons/hi';
import { LocaleContext, ThemeContext } from '../contexts';
import { US, ID } from 'country-flag-icons/react/3x2';

export default function Navigation({ logout, name }) {
  const { locale, toggleLocale } = React.useContext(LocaleContext);
  const { theme, toggleTheme } = React.useContext(ThemeContext);

  return (
    <>
      <nav className="navigation">
        <ul>
          <li>
            <button className="toggle-locale" type="button" onClick={toggleLocale}>
              {locale === 'id' ? <US title="English" className="icon" /> : <ID title="Bahasa Indonesia" className="icon" />}
            </button>
          </li>
          <li>
            <Link to="/archives">
              <HiArchive className="icon" />
            </Link>
          </li>
          <li>
            <button className="toggle-theme" type="button" onClick={toggleTheme}>
              {theme === 'light' ? <HiMoon className="icon" /> : <HiSun className="icon" />}
            </button>
          </li>
          <li>
            <button className="button-logout" type="button" onClick={logout}>
              <HiLogout className="icon" />
              {name}
            </button>
          </li>
        </ul>
      </nav>
    </>
  );
}

Navigation.propTypes = {
  logout: propTypes.func.isRequired,
  name: propTypes.string.isRequired,
};
