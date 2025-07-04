import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const AnnouncementBar = () => {
  const [announcement, setAnnouncement] = useState(() => localStorage.getItem('announcement') || '欢迎使用新标签页！');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    localStorage.setItem('announcement', announcement);
  }, [announcement]);

  const handleSave = () => {
    setIsEditing(false);
  };

  return (
    <div style={{
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      padding: '15px',
      borderRadius: '12px',
      width: '100%',
      boxSizing: 'border-box',
      textAlign: 'center',
      color: 'white',
      textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      backdropFilter: 'blur(5px)',
      WebkitBackdropFilter: 'blur(5px)'
    }}>
      <h3>常驻公告栏</h3>
      {isEditing ? (
        <textarea
          value={announcement}
          onChange={(e) => setAnnouncement(e.target.value)}
          onBlur={handleSave}
          style={{
            width: '100%',
            minHeight: '50px',
            backgroundColor: 'rgba(255, 255, 255, 0.7)',
            border: '1px solid #ccc',
            borderRadius: '5px',
            padding: '5px'
          }}
        />
      ) : (
        <p onDoubleClick={() => setIsEditing(true)}>{announcement}</p>
      )}
      {!isEditing && (
        <button 
          onClick={() => setIsEditing(true)}
          style={{
            marginTop: '10px',
            padding: '5px 10px',
            backgroundColor: 'rgba(255,255,255,0.2)',
            border: 'none',
            borderRadius: '5px',
            color: 'white',
            cursor: 'pointer'
          }}
        >
          Edit
        </button>
      )}
    </div>
  );
};

export default AnnouncementBar;