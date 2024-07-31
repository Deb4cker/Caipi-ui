import AddTrackModal from '../track/AddTrackModal';
import { useState } from 'react';
import './css/AlbumView.css';
import PropTypes from 'prop-types';
import RemoveButton from '../components/RemoveButton';
import { create, remove } from '../service/TrackService';
import NotificationBubble from '../components/NotificationBubble';

const AlbumView = ({ album }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notification, setNotification] = useState({ isVisible: false, isSuccess: false, message: '' });

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleAddTrack = (track) => {
    try {
      const newTrack = { title: track.title, albumId: track.albumId };
      create(newTrack);
      setNotification({ isVisible: true, isSuccess: true, message: 'Faixa adicionada com sucesso!' });
    } catch (error) {
      setNotification({ isVisible: true, isSuccess: false, message: 'Erro ao adicionar faixa!' });
    }
  };

  const handleRemoveTrack = (trackId) => {
    try {
      remove(trackId);
      setNotification({ isVisible: true, isSuccess: true, message: 'Faixa removida com sucesso!' });
    } catch (error) {
      setNotification({ isVisible: true, isSuccess: false, message: 'Erro ao remover faixa!' });
    }
  };

  if (!album) {
    return <div className="album-view-content">Selecione um álbum para visualizar os detalhes.</div>;
  }

  return (
    <div className="album-view">
      <h2>{album.title}</h2>
      <p>Ano: {album.year}</p>
      <img src={album.imageUrl} alt={album.title} />
      <button className='add-track-button' onClick={openModal}>Adicionar Faixa+</button>
      <AddTrackModal isOpen={isModalOpen} onClose={closeModal} onAddTrack={handleAddTrack} albumId={album.id} />
      <h3>Faixas:</h3>
      <ul>
        {album.tracks.map((track, index) => (
          <li key={track.id}>
            <div className='track-item'>
              {index + 1}. {track.title}
              <RemoveButton onClick={() => handleRemoveTrack(track.id)} />
            </div>
          </li>
        ))}
      </ul>
      {notification.isVisible && (
        <NotificationBubble isSuccess={notification.isSuccess} message={notification.message} />
      )}
    </div>
  );
};

AlbumView.propTypes = {
  album: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    year: PropTypes.number.isRequired,
    imageUrl: PropTypes.string,
    tracks: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
      })
    ).isRequired,
  }).isRequired,
};

export default AlbumView;