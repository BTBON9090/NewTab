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
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      boxSizing: 'border-box',
      padding: '10px'
    }}>
      <form onSubmit={handleSearch} style={{ display: 'flex', alignItems: 'center', width: '100%', justifyContent: 'center' }}>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search..."
          style={{
            padding: '12px 20px', /* Increased padding */
            borderRadius: '25px',
            border: '1px solid rgba(255,255,255,0.5)',
            width: '80%',
            maxWidth: '400px',
            marginRight: '10px',
            backgroundColor: 'rgba(255,255,255,0.2)',
            color: 'white',
            outline: 'none',
            boxSizing: 'border-box',
            fontSize: '1.1em', /* Larger font */
            backdropFilter: 'blur(3px)',
            WebkitBackdropFilter: 'blur(3px)'
          }}
        />
        <select
          value={searchEngine}
          onChange={(e) => setSearchEngine(e.target.value)}
          style={{
            padding: '12px 20px',
            borderRadius: '25px',
            border: '1px solid rgba(255,255,255,0.5)',
            backgroundColor: 'rgba(255,255,255,0.2)',
            color: 'white',
            outline: 'none',
            cursor: 'pointer',
            appearance: 'none',
            backgroundImage: 'url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292%22%20height%3D%22292%22%3E%3Cpath%20fill%3D%22%23ffffff%22%20d%3D%22M287%2C197L159%2C69c-3-3-8-3-11%2C0L1%2C197c-3%2C3-3%2C8%2C0%2C11l11%2C11c3%2C3%2C8%2C3%2C11%2C0l124-124c3-3%2C8-3%2C11%2C0l124%2C124c3%2C3%2C8%2C3%2C11%2C0l11-11C290%2C205%2C290%2C200%2C287%2C197z%22%2F%3E%3C%2Fsvg%3E")',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'right 10px center',
            backgroundSize: '12px',
            paddingRight: '30px',
            fontSize: '1.1em',
            backdropFilter: 'blur(3px)',
            WebkitBackdropFilter: 'blur(3px)'
          }}
        >
          <option value="google" style={{ backgroundColor: '#333', color: 'white' }}>Google</option>
          <option value="baidu" style={{ backgroundColor: '#333', color: 'white' }}>Baidu</option>
        </select>
        <button
          type="submit"
          style={{
            padding: '12px 20px',
            borderRadius: '25px',
            border: 'none',
            backgroundColor: '#007bff',
            color: 'white',
            cursor: 'pointer',
            fontWeight: 'bold',
            boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
            transition: 'background-color 0.3s ease',
          }}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#0056b3'}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#007bff'}
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchBar;