import React, { useState } from 'react';
import { Combobox } from '@headlessui/react';
import Link from 'next/link';

function Searchbar() {
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleQueryChange = async (newQuery) => {
    setQuery(newQuery);
  
    if (newQuery.trim() !== '') {
      try {
        const response = await fetch(`/api/searchproxy?character=${encodeURIComponent(newQuery)}`);
        const data = await response.json();
        setSearchResults(data.stops);
      } catch (error) {
        console.error('Error fetching search results:', error);
      }
    } else {
      setSearchResults([]);
    }
  };
  
  return (
    <Combobox value={selectedPerson} onChange={setSelectedPerson}>
      <Combobox.Input
        onChange={(event) => handleQueryChange(event.target.value)}
        value={query}
        className="w-full py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ffa1a1] bg-[#363535] text-gray-300"
        placeholder="Search for stations..."
      />

      <Combobox.Options className="mt-2 rounded-md shadow-md bg-[#363535]">
        {searchResults.map((station) => (
          <Combobox.Option
            key={station.id}
            value={station.name}
            className="py-2 px-4 hover:bg-[#363135] cursor-pointer"
          >
            <Link href={`/station/${station.number}`} passHref>
              <p className="text-gray-400">{station.name}</p>
            </Link>
          </Combobox.Option>
        ))}
      </Combobox.Options>
    </Combobox>
  );
}

export default Searchbar;
