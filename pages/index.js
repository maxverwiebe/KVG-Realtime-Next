import React from 'react';
import Navbar from '../components/Navbar';
import SearchBar from '../components/SearchBar';
import SearchResults from '../components/SearchResults';
import FavoriteStations from '@/components/Favoritestations';
const Home = () => {
  const mockResults = ['Bus 123', 'Bus 456', 'Bus 789']; // Beispiel-Suchergebnisse

  return (
    <div>
      <title>KVG-Tracker Home</title>
      <div className="container mx-auto p-4">
        <SearchBar />
        <FavoriteStations />
        
      </div>
    </div>
  );
};

export default Home;
