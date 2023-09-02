import React from 'react';
import Searchbar from '@/components/Searchbar';
import FavoriteStations from '@/components/Favoritestations';
const Home = () => {
  return (
    <div>
      <title>KVG-Tracker Home</title>
      <div className="container mx-auto p-4">
        <Searchbar />
        <FavoriteStations />
      </div>
    </div>
  );
};

export default Home;
