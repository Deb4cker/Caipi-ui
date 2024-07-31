import './css/SearchCard.css';
import { useState } from 'react';
import AddAlbumModal from './AddAlbumModal';
import PropTypes from 'prop-types';
import { search } from '../../service/AlbumService';

const SearchCard = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = async () => {
    try {
      const response = await search(searchTerm);
      onSearch(response.data);
    } catch (error) {
      console.error("Erro ao buscar álbuns:", error);
      onSearch([]);
    }
  };

  return (
    <div className="search-card">
      <h2>Pesquisar</h2>
      <div className='tools'>
        <div className="search-form">
          <input 
            type="text" 
            placeholder="Digite o nome do album" 
            value={searchTerm} 
            onChange={handleSearchChange} 
          />
          <button onClick={handleSearchSubmit}>🔎</button>
        </div>
        <button onClick={openModal}>Novo Album+</button>
      </div>
      <AddAlbumModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};

SearchCard.propTypes = {
  onSearch: PropTypes.func.isRequired
};

export default SearchCard;