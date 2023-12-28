import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { SearchBar, NoteList, Loading } from '../components';
import { getArchivedNotes } from '../utils/network-data';
import { LocaleContext } from '../contexts';

export default function ArchivesNotePage() {
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
      const { error, data } = await getArchivedNotes();
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
      <h2>{locale === 'id' ? 'Catatan Arsip' : 'Archive Notes'}</h2>
      <SearchBar keyword={keyword} keywordChange={onKeywordChange} />
      <NoteList notes={filteredNotes} />
    </>
  );
}
