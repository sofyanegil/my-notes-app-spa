import React from 'react';
import PropTypes from 'prop-types';
import { FiBookmark } from 'react-icons/fi';

export default function ArchiveButton({ id, archived, onArchive, onUnArchive }) {
  return (
    <>
      <button className="action" type="submit" onClick={() => (archived ? onUnArchive(id) : onArchive(id))}>
        {archived ? <FiBookmark fill="#000" /> : <FiBookmark />}
      </button>
    </>
  );
}

ArchiveButton.propTypes = {
  id: PropTypes.string.isRequired,
  archived: PropTypes.bool.isRequired,
  onArchive: PropTypes.func.isRequired,
  onUnArchive: PropTypes.func.isRequired,
};
