import './App.css';
import AlbumList from './album/AlbumList';
import SearchCard from './components/tools/SearchCard';
import AlbumView from './album/AlbumView';
import { useState } from 'react';

function App() {
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [searchResults, setSearchResults] = useState([]);

  const handleAlbumClick = (album) => {
    setSelectedAlbum(album);
  };

  const handleSearch = (results) => {
    setSearchResults(results);
  };

  return (
    <div className="App">
      <div className='sidebar'>
        <SearchCard onSearch={handleSearch} />
        <div className='album-list'>
          <AlbumList searchResults={searchResults} onAlbumClick={handleAlbumClick} />
        </div>
      </div>
      <div className="album-view">
        {selectedAlbum && <AlbumView album={selectedAlbum} />}
      </div>
    </div>
  );
}

export default App;