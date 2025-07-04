import React, { useState } from 'react';

const QuickLinks = () => {
  const [enterpriseLinks, setEnterpriseLinks] = useState([
    { name: '企业邮箱', url: 'https://mail.example.com' },
    { name: '企业OA', url: 'https://oa.example.com' },
  ]);
  const [personalLinks, setPersonalLinks] = useState([
    { name: '个人博客', url: 'https://myblog.com' },
    { name: '常用工具', url: 'https://tools.com' },
  ]);

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
      gap: '20px',
      marginTop: '20px',
      position: 'relative',
      zIndex: 1
    }}>
      <div>
        <h3>企业应用</h3>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {enterpriseLinks.map((link, index) => (
            <li key={index} style={{ marginBottom: '5px' }}>
              <a href={link.url} target="_blank" rel="noopener noreferrer" style={{ color: 'white', textDecoration: 'none' }}>
                {link.name}
              </a>
              <button onClick={() => handleRemoveLink('enterprise', index)} style={{ marginLeft: '10px', background: 'none', border: 'none', color: 'red', cursor: 'pointer' }}>x</button>
            </li>
          ))}
        </ul>
        <button onClick={() => handleAddLink('enterprise')} style={{ padding: '5px 10px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Add Enterprise Link</button>
      </div>

      <div>
        <h3>个人应用</h3>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {personalLinks.map((link, index) => (
            <li key={index} style={{ marginBottom: '5px' }}>
              <a href={link.url} target="_blank" rel="noopener noreferrer" style={{ color: 'white', textDecoration: 'none' }}>
                {link.name}
              </a>
              <button onClick={() => handleRemoveLink('personal', index)} style={{ marginLeft: '10px', background: 'none', border: 'none', color: 'red', cursor: 'pointer' }}>x</button>
            </li>
          ))}
        </ul>
        <button onClick={() => handleAddLink('personal')} style={{ padding: '5px 10px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Add Personal Link</button>
      </div>
    </div>
  );
};

export default QuickLinks;