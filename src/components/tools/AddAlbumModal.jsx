import { useState } from 'react';
import './css/AddAlbumModal.css';
import { create } from '../../service/AlbumService';
import PropTypes from 'prop-types';
import NotificationBubble from '../NotificationBubble';

const AddAlbumModal = ({ isOpen, onClose }) => {
  const [title, setTitle] = useState('');
  const [year, setYear] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newAlbum = { title, year, imageUrl };
    console.log('Novo álbum:', newAlbum);
    
    let response;
    try {
         response = create(newAlbum);
         <NotificationBubble isSuccess={true} message="Álbum criado com sucesso!" />
    } catch (error) {
        <NotificationBubble isSuccess={false} message="Erro ao criar álbum!" />
        console.log('Erro ao criar album:', response);
    }

    console.log('Album criado com sucesso:', response);

    onClose();
  }

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>Adicionar Novo Álbum</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Nome do Álbum</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="year">Ano</label>
            <input
              type="number"
              id="year"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="imageUrl">Capa do Álbum (Link da Imagem)</label>
            <input
              type="text"
              id="imageUrl"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              required
            />
          </div>
          <button type="submit">Adicionar Álbum</button>
        </form>
      </div>
    </div>
  );
};

AddAlbumModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired
};

export default AddAlbumModal;