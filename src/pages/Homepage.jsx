import React from 'react';
import { NavLink, useSearchParams } from 'react-router-dom';
import { SearchBar, NoteList, Loading } from '../components';
import { getActiveNotes } from '../utils/network-data';
import { HiPlus } from 'react-icons/hi';
import LocaleContext from '../contexts/LocaleContext';

export default function HomePage() {
  const { locale } = React.useContext(LocaleContext);

  const [searchParams, setSearchParams] = useSearchParams();
  const [notes, setNotes] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [keyword, setKeyword] = React.useState(() => {
    return searchParams.get('keyword') || '';
  });

  const filteredNotes = notes.filter((note) => note.title.toLowerCase().includes(keyword.toLowerCase()));

  React.useEffect(() => {
    const getNotes = async () => {
      const { error, data } = await getActiveNotes();
      if (!error) {
        setNotes(data);
      }
      setLoading(false);
    };
    getNotes();
  }, []);

  function onKeywordChange(keyword) {
    setKeyword(keyword);
    setSearchParams({ keyword });
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <h2>{locale === 'id' ? 'Catatan Aktif' : 'Active Notes'}</h2>
      <SearchBar keyword={keyword} keywordChange={onKeywordChange} />
      <NoteList notes={filteredNotes} />
      <div className="homepage__action">
        <NavLink to="/notes/new">
          <HiPlus className="icon" />
        </NavLink>
      </div>
    </>
  );
}
