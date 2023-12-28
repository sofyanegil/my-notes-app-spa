import React from 'react';
import PropTypes from 'prop-types';
import { LocaleContext } from '../contexts';

export default function SearchBar({ keyword, keywordChange }) {
  const { locale } = React.useContext(LocaleContext);

  return (
    <section className="search-bar">
      <input type="text" placeholder={locale === 'id' ? 'Cari berdasarkan judul ...' : 'Search by title ...'} value={keyword} onChange={(event) => keywordChange(event.target.value)} />
    </section>
  );
}

SearchBar.propType = {
  keyword: PropTypes.string.isRequired,
  keywordChange: PropTypes.func.isRequired,
};
