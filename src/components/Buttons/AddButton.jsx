import React from 'react';
import PropTypes from 'prop-types';
import { FiSave } from 'react-icons/fi';

export default function AddButton({ onAddNote }) {
  return (
    <div className="add-new-page__action">
      <button className="action" type="submit" onClick={onAddNote}>
        <FiSave />
      </button>
    </div>
  );
}

AddButton.propTypes = {
  onAddNote: PropTypes.func.isRequired,
};
