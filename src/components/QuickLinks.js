import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const QuickLinks = () => {
  const [enterpriseLinks, setEnterpriseLinks] = useState(() => {
    const storedLinks = localStorage.getItem('enterpriseLinks');
    return storedLinks ? JSON.parse(storedLinks) : [
      { name: '企业邮箱', url: 'https://mail.example.com' },
      { name: '企业OA', url: 'https://oa.example.com' },
    ];
  });
  const [personalLinks, setPersonalLinks] = useState(() => {
    const storedLinks = localStorage.getItem('personalLinks');
    return storedLinks ? JSON.parse(storedLinks) : [
      { name: '个人博客', url: 'https://myblog.com' },
      { name: '常用工具', url: 'https://tools.com' },
    ];
  });

  useEffect(() => {
    localStorage.setItem('enterpriseLinks', JSON.stringify(enterpriseLinks));
  }, [enterpriseLinks]);

  useEffect(() => {
    localStorage.setItem('personalLinks', JSON.stringify(personalLinks));
  }, [personalLinks]);

  const handleAddLink = (type) => {
    const name = prompt('Enter link name:');
    const url = prompt('Enter link URL:');
    if (name && url) {
      if (type === 'enterprise') {
        setEnterpriseLinks([...enterpriseLinks, { name, url }]);
      } else {
        setPersonalLinks([...personalLinks, { name, url }]);
      }
    }
  };

  const handleRemoveLink = (type, index) => {
    if (type === 'enterprise') {
      setEnterpriseLinks(enterpriseLinks.filter((_, i) => i !== index));
    } else {
      setPersonalLinks(personalLinks.filter((_, i) => i !== index));
    }
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column', /* Stack groups vertically */
      gap: '20px',
      width: '100%',
      boxSizing: 'border-box',
      padding: '10px',
    }}>
      <div style={{
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: '8px',
        padding: '15px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      }}>
        <h3 style={{ marginTop: 0, marginBottom: '15px', color: 'white', textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}>企业应用</h3>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {enterpriseLinks.map((link, index) => (
            <li key={index} style={{ marginBottom: '10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <a href={link.url} target="_blank" rel="noopener noreferrer" style={{ color: 'white', textDecoration: 'none', fontSize: '1.1em', flexGrow: 1 }}>
                {link.name}
              </a>
              <button onClick={() => handleRemoveLink('enterprise', index)} style={{ marginLeft: '10px', background: 'none', border: 'none', color: 'rgba(255, 255, 255, 0.7)', cursor: 'pointer', fontSize: '1.2em' }}>&times;</button>
            </li>
          ))}
        </ul>
        <button onClick={() => handleAddLink('enterprise')} style={{
          padding: '8px 15px',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          marginTop: '10px',
          width: '100%',
          fontWeight: 'bold'
        }}>Add Enterprise Link</button>
      </div>

      <div style={{
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: '8px',
        padding: '15px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      }}>
        <h3 style={{ marginTop: 0, marginBottom: '15px', color: 'white', textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}>个人应用</h3>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {personalLinks.map((link, index) => (
            <li key={index} style={{ marginBottom: '10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <a href={link.url} target="_blank" rel="noopener noreferrer" style={{ color: 'white', textDecoration: 'none', fontSize: '1.1em', flexGrow: 1 }}>
                {link.name}
              </a>
              <button onClick={() => handleRemoveLink('personal', index)} style={{ marginLeft: '10px', background: 'none', border: 'none', color: 'rgba(255, 255, 255, 0.7)', cursor: 'pointer', fontSize: '1.2em' }}>&times;</button>
            </li>
          ))}
        </ul>
        <button onClick={() => handleAddLink('personal')} style={{
          padding: '8px 15px',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          marginTop: '10px',
          width: '100%',
          fontWeight: 'bold'
        }}>Add Personal Link</button>
      </div>
    </div>
  );
};

export default QuickLinks;