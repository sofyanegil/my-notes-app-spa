import React from 'react';
import PropTypes from 'prop-types';
import { FiTrash } from 'react-icons/fi';

export default function DeleteButton({ id, onDelete }) {
  return (
    <button className="action" type="submit" onClick={() => onDelete(id)}>
      <FiTrash />
    </button>
  );
}

DeleteButton.propTypes = {
  id: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
};
