import React from 'react';
import PropTypes from 'prop-types';
import { NoteItem } from './index';

export default function NoteList({ notes }) {
  return (
    <>
      {notes.length ? (
        <section className="notes-list">
          {notes.map((note) => (
            <NoteItem key={note.id} id={note.id} note={note} />
          ))}
        </section>
      ) : (
        <div className="notes-list-empty not-found">
          <img src="/assets/Not-Found.png" alt="Not Found" />
          <h2>No Notes Found</h2>
        </div>
      )}
    </>
  );
}

NoteList.propTypes = {
  notes: PropTypes.arrayOf(PropTypes.object).isRequired,
};
