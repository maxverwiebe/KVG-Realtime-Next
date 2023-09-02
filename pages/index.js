import React from 'react';
import Navbar from '../components/Navbar';
import SearchBar from '../components/SearchBar';
import SearchResults from '../components/SearchResults';
import FavoriteStations from '@/components/Favoritestations';
const Home = () => {
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
