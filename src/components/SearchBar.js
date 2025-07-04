import React, { useState } from 'react';
import PropTypes from 'prop-types';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchEngine, setSearchEngine] = useState('google'); // 'google', 'baidu'

  const handleSearch = (e) => {
    e.preventDefault();
    let url = '';
    if (searchEngine === 'google') {
      url = `https://www.google.com/search?q=${encodeURIComponent(searchTerm)}`;
    } else if (searchEngine === 'baidu') {
      url = `https://www.baidu.com/s?wd=${encodeURIComponent(searchTerm)}`;
    }
    window.open(url, '_blank');
  };

  return (
    <div style={{
      marginTop: '20px',
      position: 'relative',
      zIndex: 1
    }}>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search..."
          style={{
            padding: '10px',
            borderRadius: '5px',
            border: '1px solid #ccc',
            width: '300px',
            marginRight: '10px'
          }}
        />
        <select
          value={searchEngine}
          onChange={(e) => setSearchEngine(e.target.value)}
          style={{
            padding: '10px',
            borderRadius: '5px',
            border: '1px solid #ccc',
            marginRight: '10px'
          }}
        >
          <option value="google">Google</option>
          <option value="baidu">Baidu</option>
        </select>
        <button 
          type="submit"
          style={{
            padding: '10px 15px',
            borderRadius: '5px',
            border: 'none',
            backgroundColor: '#007bff',
            color: 'white',
            cursor: 'pointer'
          }}
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchBar;