'use client';

import { useState, useEffect } from 'react';

export default function SearchBar({ onSearch }) {
  const [city, setCity] = useState('');
  const [recentSearches, setRecentSearches] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false); 

  useEffect(() => {
    const savedSearches = JSON.parse(localStorage.getItem('recentSearches')) || [];
    setRecentSearches(savedSearches);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim()) {
      onSearch(city);
      const updatedSearches = [city, ...recentSearches.filter(c => c !== city)].slice(0, 5);
      setRecentSearches(updatedSearches);
      localStorage.setItem('recentSearches', JSON.stringify(updatedSearches));
      setCity('');
      setShowDropdown(false);
    }
  };

  const handleRecentSearch = (selectedCity) => {
    setCity(selectedCity);
    onSearch(selectedCity);
    setShowDropdown(false); 
  };

  const handleInputChange = (e) => {
    setCity(e.target.value);
    setShowDropdown(true); 
  };

  return (
    <div className="relative w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="flex justify-center">
        <input
          type="text"
          value={city}
          onChange={handleInputChange}
          placeholder="Enter city name..."
          className="w-full px-4 py-3 text-gray-700 bg-white border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="px-6 py-3 text-white bg-blue-600 rounded-r-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Search
        </button>
      </form>
      {recentSearches.length > 0 && showDropdown && (
        <ul className="absolute z-10 w-full max-w-md mt-2 bg-white border border-gray-200 rounded-md shadow-lg">
          {recentSearches.map((search, index) => (
            <li
              key={index}
              className="px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleRecentSearch(search)}
            >
              {search}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}