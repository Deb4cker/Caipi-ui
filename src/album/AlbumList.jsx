import { getAll } from '../service/AlbumService';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import AlbumCard from './AlbumCard';

const AlbumList = ({ onAlbumClick, searchResults }) => {
    const [albums, setAlbums] = useState([]);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const fetchAlbums = async () => {
        try {
          const response = await getAll();
          setAlbums(response.data);
          setLoading(false);
        } catch (error) {
          console.error("Erro ao obter os álbuns:", error);
          setLoading(false);
        }
      };
  
      fetchAlbums();
    }, []);
  
    const displayedAlbums = searchResults.length > 0 ? searchResults : albums;
  
    if (loading) {
      return <p>Carregando...</p>;
    }
  
    if (!displayedAlbums.length) {
      return <p>Nenhum álbum encontrado</p>;
    }
  
    return (
      <div>
        {displayedAlbums.map((album) => (
          <AlbumCard key={album.id} album={album} onAlbumClick={onAlbumClick} />
        ))}
      </div> 
    );
  };
  
  AlbumList.propTypes = {
    onAlbumClick: PropTypes.func.isRequired,
    searchResults: PropTypes.array
  };
  
  AlbumList.defaultProps = {
    searchResults: []
  };
  
  export default AlbumList;