import React from 'react';

const SearchResults = ({ results }) => {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Suchergebnisse</h2>
      <ul>
        {results.map((result, index) => (
          <li key={index} className="border-b py-2">
            {result}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchResults;
