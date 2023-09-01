import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import Link from 'next/link';

const FavoriteStations = () => {
  const [favoriteStations, setFavoriteStations] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const favoriteStationsData = [];
      const cookieKeys = Object.keys(Cookies.get());
  
      for (const key of cookieKeys) {
        if (/^\d{4}$/.test(key)) {
          const response = await fetch(`http://localhost:3000/api/getstopinfo?id=${key}`);
          const stationData = await response.json();
          favoriteStationsData.push(stationData);
        }
      }
    
      setFavoriteStations(favoriteStationsData);
      };
  
    fetchData();
  }, []);
  

  return (
    <div>
      <div class="inline-flex items-center justify-center w-full">
          <hr class="w-full h-px my-8 bg-gray-500 border-0" />
          <span class="absolute px-3 bg-[#262525] font-medium text-gray-300 -translate-x-1/2 left-1/2">Favorites</span>
      </div>

      {favoriteStations.length === 0 && // Loading circle
        <div role="status">
            <svg aria-hidden="true" class="w-8 h-8 mr-2 text-gray-500 animate-spin fill-red-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/></svg>
            <span class="sr-only">Loading...</span>
        </div>
      }

      {favoriteStations.map((station, index) => (
        <Link href={`/station/${station.stopShortName}`} class="block w-full py-2 px-4 mb-2 border rounded-lg shadow bg-[#363535] border-gray-600 hover:bg-[#383838]">
          <h5 class="mb-2 text-2xl tracking-tight text-gray-200">{station.stopName || "Error fetching data..."}</h5>
          <span class="bg-gray-400 text-gray-800 text-xs font-medium mr-2 px-2.5 rounded-full">
            {station.actual && station.actual[0] ? `${station.actual[0].patternText} -> ${station.actual[0].direction}` : "No next trip found."}
          </span>
          <span class="text-gray-500 text-lg">...</span>
        </Link>
      ))}
    </div>
  );
  
};

export default FavoriteStations;
