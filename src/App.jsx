import React from 'react';
import { Route, Routes, NavLink } from 'react-router-dom';
import { HomePage, ArchivesNotePage, AddNotePage, DetailNotePage, LoginPage, RegisterPage, NotFoundPage } from './pages';
import { Navigation } from './components';
import { getUserLogged, putAccessToken } from './utils/network-data';
import { LocaleProvider } from './contexts/LocaleContext';
import { ThemeProvider } from './contexts/ThemeContext';
import Swal from 'sweetalert2';

export default function App() {
  const initialLocale = localStorage.getItem('locale') || 'id';
  const initialTheme = localStorage.getItem('theme') || 'light';

  const [authedUser, setAuthedUser] = React.useState(null);
  const [initializing, setInitializing] = React.useState(true);
  const [locale, setLocale] = React.useState(initialLocale);
  const [theme, setTheme] = React.useState(initialTheme);

  const onLoginSuccess = async ({ accessToken }) => {
    putAccessToken(accessToken);
    const { data } = await getUserLogged();
    setAuthedUser(data);
    Swal.fire({
      icon: 'success',
      title: locale === 'id' ? 'Berhasil Masuk' : 'Login Success',
      text: locale === 'id' ? 'Kamu berhasil masuk ke aplikasi' : 'You have successfully logged into the application',
      showConfirmButton: false,
      timer: 2000,
    });
  };

  const onLogout = () => {
    setAuthedUser(null);
    putAccessToken('');
    Swal.fire({
      icon: 'success',
      title: locale === 'id' ? 'Berhasil Keluar' : 'Logout Success',
      text: locale === 'id' ? 'Kamu berhasil keluar dari aplikasi' : 'You have successfully logged out of the application',
      showConfirmButton: false,
      timer: 2000,
    });
  };

  const toggleLocale = () => {
    setLocale((prevState) => {
      const newLocale = prevState === 'id' ? 'en' : 'id';
      localStorage.setItem('locale', newLocale);
      return newLocale;
    });
  };

  const toggleTheme = () => {
    setTheme((prevState) => {
      const newTheme = prevState === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', newTheme);
      return newTheme;
    });
  };

  const localeContextValue = React.useMemo(() => {
    return { locale, toggleLocale };
  }, [locale]);

  const themeContextValue = React.useMemo(() => {
    return { theme, toggleTheme };
  }, [theme]);

  React.useEffect(() => {
    async function init() {
      const { error, data } = await getUserLogged();
      if (!error) {
        setAuthedUser(data);
      }
      setInitializing(false);
    }

    init();
  }, []);

  React.useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  if (initializing) {
    return null;
  }

  const commonRoutes = (
    <>
      <Route path="/" element={<HomePage />} />
      <Route path="/notes/:id" element={<DetailNotePage />} />
      <Route path="/archives" element={<ArchivesNotePage />} />
      <Route path="/notes/new" element={<AddNotePage />} />
      <Route path="*" element={<NotFoundPage />} />
    </>
  );

  return (
    <LocaleProvider value={localeContextValue}>
      <ThemeProvider value={themeContextValue}>
        <div className="app-container">
          <header>
            <h1>
              <NavLink to="/">{locale === 'id' ? 'Aplikasi Catatan' : 'Notes App'}</NavLink>
            </h1>
            {authedUser && <Navigation logout={onLogout} name={authedUser.name} />}
          </header>
          <main>
            <Routes>
              {authedUser ? commonRoutes : <Route path="*" element={<LoginPage loginSuccess={onLoginSuccess} />} />}
              {!authedUser && <Route path="/register" element={<RegisterPage />} />}
            </Routes>
          </main>
          <footer>
            <p>Sofyan Egi Lesmana &copy; {new Date().getFullYear()}</p>
          </footer>
        </div>
      </ThemeProvider>
    </LocaleProvider>
  );
}
