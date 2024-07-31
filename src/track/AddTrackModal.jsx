import { useState } from 'react';
import './css/AddTrackModal.css';
import { create } from '../service/TrackService';
import PropTypes from 'prop-types';

const AddTrackModal = ({ isOpen, onClose, onAddTrack, albumId }) => {
  const [trackName, setTrackName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddTrack({ name: trackName, albumId: albumId });
    setTrackName('');

    let response;
    try {
        const newTrack = { 
            title: trackName,
             albumId: albumId
        };

        console.log(newTrack);
        response = create(newTrack);
    } catch (error) {
        console.log('Erro ao criar faixa:', response);
    }

    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>Adicionar Nova Faixa</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="trackName">Nome da Faixa</label>
            <input
              type="text"
              id="trackName"
              value={trackName}
              onChange={(e) => setTrackName(e.target.value)}
              required
            />
          </div>
          <button type="submit">Adicionar Faixa</button>
        </form>
      </div>
    </div>
  );
};

AddTrackModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onAddTrack: PropTypes.func.isRequired,
    albumId: PropTypes.number.isRequired
};

export default AddTrackModal;
