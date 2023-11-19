import React, { useState } from 'react';
import axios from 'axios';

const apiKey = '8036d6c72b5b8cc742c4dddd1c065316';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${apiKey}`
      );


      onSearch(response.data);
    } catch (error) {
      console.error('Error fetching data from OpenWeatherMap API', error);
    }
  };

  return (
    <div className="input-group mb-3">
      <input
        type="text"
        className="form-control"
        placeholder="Enter city name"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <div className="input-group-append">
        <button className="btn btn-primary" type="button" onClick={handleSearch}>
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchBar;