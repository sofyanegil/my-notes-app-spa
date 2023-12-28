import React from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { NoteInput } from '../components';
import { addNote } from '../utils/network-data';

export default function AddNotePage() {
  const navigate = useNavigate();

  function onAddNoteHandler(note) {
    addNote(note);
    navigate('/');
    Swal.fire({
      icon: 'success',
      title: 'Catatan Ditambahkan',
      showConfirmButton: false,
      timer: 2000,
    });
  }

  return (
    <section className="add-new-page">
      <NoteInput onAddNote={onAddNoteHandler} />
    </section>
  );
}
