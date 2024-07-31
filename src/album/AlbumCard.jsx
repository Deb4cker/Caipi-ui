import PropTypes from 'prop-types';
import { useState } from 'react';
import './css/AlbumCard.css';
import { remove } from '../service/AlbumService';
import RemoveButton from '../components/RemoveButton';
import NotificationBubble from '../components/NotificationBubble';

const AlbumCard = ({ album, onAlbumClick }) => {
  const [notification, setNotification] = useState({ isVisible: false, isSuccess: false, message: '' });

  const RemoveAlbum = async () => {
    try {
      await remove(album.id);
      setNotification({ isVisible: true, isSuccess: true, message: 'Álbum removido com sucesso!' });
    } catch (error) {
      setNotification({ isVisible: true, isSuccess: false, message: 'Erro ao remover álbum!' });
    }
  };

  const handleNotificationClose = () => {
    setNotification({ ...notification, isVisible: false });
  };

  return (
    <div className="album-card" onClick={() => onAlbumClick(album)}>
      <div className="album-image">
        <img src={album.imageUrl} alt={album.title} />
      </div>
      <div className="album-info">
        <h2 className="album-title">{album.title}</h2>
        <p className="album-year">{album.year}</p>
      </div>
      <RemoveButton onClick={RemoveAlbum} />
      {notification.isVisible && (
        <NotificationBubble
          isSuccess={notification.isSuccess}
          message={notification.message}
          onClose={handleNotificationClose}
        />
      )}
    </div>
  );
};

AlbumCard.propTypes = {
  album: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    year: PropTypes.number.isRequired,
    imageUrl: PropTypes.string
  }).isRequired,
  onAlbumClick: PropTypes.func.isRequired
};

export default AlbumCard;