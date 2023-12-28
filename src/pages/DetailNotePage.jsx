import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import NotFoundPage from './NotFoundPage';
import { NoteDetail, Loading } from '../components';
import { getNote, deleteNote, archiveNote, unarchiveNote } from '../utils/network-data';

export default function DetailNotePage() {
  const { id } = useParams();
  const [note, setNote] = React.useState('');
  const [loading, setLoading] = React.useState(true);

  const navigate = useNavigate();

  async function onDeleteHandler(id) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-primary',
        cancelButton: 'btn btn-danger',
      },
      buttonsStyling: true,
    });

    swalWithBootstrapButtons
      .fire({
        title: 'Yakin, Hapus?',
        text: 'Catatan yang dihapus tidak bisa dikembalikan',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Hapus!',
        cancelButtonText: 'Batal',
        reverseButtons: true,
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          swalWithBootstrapButtons.fire('Terhapus!', 'Catatan Anda dihapus', 'success');
          await deleteNote(id);
          navigate('/');
        }
        if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire('Batal Hapus', 'Catatan Anda masih ada', 'error');
        }
      });
  }

  async function onArchiveHandler(id) {
    await archiveNote(id);
    Swal.fire({
      icon: 'success',
      title: 'Catatan Diarsipkan',
      showConfirmButton: false,
      timer: 2000,
    });
    navigate('/');
  }

  async function onUnArchiveHandler(id) {
    await unarchiveNote(id);
    Swal.fire({
      icon: 'success',
      title: 'Catatan Dihapus dari arsip',
      showConfirmButton: false,
      timer: 2000,
    });
    navigate('/');
  }

  React.useEffect(() => {
    const getDetailNote = async () => {
      const { error, data } = await getNote(id);
      if (!error) {
        setNote(data);
      }
      setLoading(false);
    };

    getDetailNote();
  }, [id]);

  if (loading) {
    return <Loading />;
  }

  return <>{note ? <NoteDetail note={note} onDelete={onDeleteHandler} onArchive={onArchiveHandler} onUnArchive={onUnArchiveHandler} /> : <NotFoundPage />}</>;
}
