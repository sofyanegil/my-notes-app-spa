import React from 'react';
import PropTypes from 'prop-types';
import parser from 'html-react-parser';
import { NavLink } from 'react-router-dom';
import { showFormattedDate } from '../utils/index';

export default function NoteItem({ note }) {
  const { id, title, body, createdAt } = note;
  const formattedDate = showFormattedDate(createdAt);

  return (
    <div className="note-item">
      <h3 className="note-item__title">
        <NavLink to={`/notes/${id}`}>{title}</NavLink>
      </h3>
      <p className="note-item__createdAt">{formattedDate}</p>
      <p className="note-item__body">{parser(body)}</p>
    </div>
  );
}

NoteItem.propTypes = {
  note: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
  }).isRequired,
};
