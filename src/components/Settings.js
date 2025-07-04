import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const inputStyle = {
  width: '100%',
  padding: '8px',
  borderRadius: '5px',
  border: '1px solid #ccc',
  boxSizing: 'border-box',
  marginBottom: '10px',
};

const buttonStyle = {
  padding: '10px 15px',
  backgroundColor: '#007bff',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  fontWeight: 'bold',
  transition: 'background-color 0.3s ease',
};

const Settings = ({
  backgroundType, setBackgroundType,
  backgroundColor, setBackgroundColor,
  backgroundImageUrl, setBackgroundImageUrl,
  backgroundLocalImage, setBackgroundLocalImage,
  overlayOpacity, setOverlayOpacity,
  blurAmount, setBlurAmount,
  fontFamily, setFontFamily,
  fontSize, setFontSize
}) => {
  const [themes, setThemes] = useState({});

  useEffect(() => {
    const storedThemes = localStorage.getItem('newtab-themes');
    if (storedThemes) {
      setThemes(JSON.parse(storedThemes));
    }
  }, []);

  const saveThemes = (updatedThemes) => {
    setThemes(updatedThemes);
    localStorage.setItem('newtab-themes', JSON.stringify(updatedThemes));
  };

  const handleSaveTheme = () => {
    const themeName = prompt('Enter theme name:');
    if (themeName) {
      const newTheme = {
        backgroundType,
        backgroundColor,
        backgroundImageUrl,
        overlayOpacity,
        blurAmount,
        fontFamily,
        fontSize
      };
      saveThemes({ ...themes, [themeName]: newTheme });
      showMessage(`Theme "${themeName}" saved!`, 'success');
    }
  };

  const handleLoadTheme = (e) => {
    const themeName = e.target.value;
    if (themeName && themes[themeName]) {
      const theme = themes[themeName];
      setBackgroundType(theme.backgroundType);
      setBackgroundColor(theme.backgroundColor);
      setBackgroundImageUrl(theme.backgroundImageUrl);
      // setBackgroundLocalImage(theme.backgroundLocalImage); // Cannot load local image directly
      setOverlayOpacity(theme.overlayOpacity);
      setBlurAmount(theme.blurAmount);
      setFontFamily(theme.fontFamily);
      setFontSize(theme.fontSize);
    }
  };

  const handleDeleteTheme = () => {
    const themeName = document.querySelector('#theme-select').value;
    if (themeName && confirm(`Are you sure you want to delete theme "${themeName}"?`)) {
      const updatedThemes = { ...themes };
      delete updatedThemes[themeName];
      saveThemes(updatedThemes);
      showMessage(`Theme "${themeName}" deleted!`, 'success');
    }
  };

  return (
    <div style={{
      position: 'absolute',
      top: '20px',
      right: '20px',
      backgroundColor: 'rgba(255, 255, 255, 0.95)', /* More opaque */
      padding: '25px', /* More padding */
      borderRadius: '12px', /* More rounded */
      zIndex: 100,
      boxShadow: '0 8px 16px rgba(0,0,0,0.25)', /* Stronger shadow */
      color: '#333', /* Darker text for better contrast */
      width: '300px', /* Fixed width */
      boxSizing: 'border-box'
    }}>
      <h3 style={{ color: '#555', marginBottom: '20px' }}>Settings</h3>

      <div style={{ marginBottom: '20px', paddingBottom: '15px', borderBottom: '1px solid #eee' }}>
        <h4 style={{ marginTop: 0, marginBottom: '10px', color: '#666' }}>Background</h4>
        <div style={{ marginBottom: '10px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Type:</label>
          <select value={backgroundType} onChange={(e) => setBackgroundType(e.target.value)} style={inputStyle}>
            <option value="color">Solid Color</option>
            <option value="url">Image URL</option>
            <option value="local">Local Image</option>
          </select>
        </div>

        {backgroundType === 'color' && (
          <div style={{ marginBottom: '10px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Color:</label>
            <input type="color" value={backgroundColor} onChange={(e) => setBackgroundColor(e.target.value)} style={inputStyle} />
          </div>
        )}

        {backgroundType === 'url' && (
          <div style={{ marginBottom: '10px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Image URL:</label>
            <input
              type="text"
              value={backgroundImageUrl}
              onChange={(e) => setBackgroundImageUrl(e.target.value)}
              placeholder="Enter image URL"
              style={inputStyle}
            />
          </div>
        )}

        {backgroundType === 'local' && (
          <div style={{ marginBottom: '10px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Upload Local Image:</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setBackgroundLocalImage(e.target.files[0])}
              style={inputStyle}
            />
          </div>
        )}
      </div>

      <div style={{ marginBottom: '20px', paddingBottom: '15px', borderBottom: '1px solid #eee' }}>
        <h4 style={{ marginTop: 0, marginBottom: '10px', color: '#666' }}>Overlay</h4>
        <div style={{ marginBottom: '10px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Opacity:</label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={overlayOpacity}
            onChange={(e) => setOverlayOpacity(parseFloat(e.target.value))}
            style={{ width: '100%' }}
          />
          <span style={{ fontSize: '0.9em', color: '#777' }}>{Math.round(overlayOpacity * 100)}%</span>
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Blur Amount (px):</label>
          <input
            type="range"
            min="0"
            max="20"
            step="1"
            value={blurAmount}
            onChange={(e) => setBlurAmount(parseInt(e.target.value))}
            style={{ width: '100%' }}
          />
          <span style={{ fontSize: '0.9em', color: '#777' }}>{blurAmount}px</span>
        </div>
      </div>

      <div style={{ marginBottom: '20px', paddingBottom: '15px', borderBottom: '1px solid #eee' }}>
        <h4 style={{ marginTop: 0, marginBottom: '10px', color: '#666' }}>Font</h4>
        <div style={{ marginBottom: '10px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Family:</label>
          <select value={fontFamily} onChange={(e) => setFontFamily(e.target.value)} style={inputStyle}>
            <option value="sans-serif">Sans-serif</option>
            <option value="serif">Serif</option>
            <option value="monospace">Monospace</option>
            <option value="Arial">Arial</option>
            <option value="Verdana">Verdana</option>
            <option value="Helvetica">Helvetica</option>
            <option value="Tahoma">Tahoma</option>
            <option value="Trebuchet MS">Trebuchet MS</option>
            <option value="Georgia">Georgia</option>
            <option value="Times New Roman">Times New Roman</option>
            <option value="Courier New">Courier New</option>
            <option value="Lucida Console">Lucida Console</option>
          </select>
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Size:</label>
          <input type="range" min="12" max="36" step="1" value={fontSize} onChange={(e) => setFontSize(parseInt(e.target.value))} style={{ width: '100%' }} />
          <span style={{ fontSize: '0.9em', color: '#777' }}>{fontSize}px</span>
        </div>
      </div>

      <div>
        <h4 style={{ marginTop: 0, marginBottom: '10px', color: '#666' }}>Themes</h4>
        <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
          <button onClick={handleSaveTheme} style={buttonStyle}>Save Current</button>
          <select id="theme-select" onChange={handleLoadTheme} style={{ ...inputStyle, flexGrow: 1 }}>
            <option value="">Load Theme</option>
            {Object.keys(themes).map((themeName) => (
              <option key={themeName} value={themeName}>{themeName}</option>
            ))}
          </select>
        </div>
        <button onClick={handleDeleteTheme} style={{ ...buttonStyle, backgroundColor: '#dc3545' }}>Delete Selected</button>
      </div>
    </div>
  );
};

export default Settings;

Settings.propTypes = {
  backgroundType: PropTypes.string.isRequired,
  setBackgroundType: PropTypes.func.isRequired,
  backgroundColor: PropTypes.string.isRequired,
  setBackgroundColor: PropTypes.func.isRequired,
  backgroundImageUrl: PropTypes.string.isRequired,
  setBackgroundImageUrl: PropTypes.func.isRequired,
  backgroundLocalImage: PropTypes.object, // File object, can be null
  setBackgroundLocalImage: PropTypes.func.isRequired,
  overlayOpacity: PropTypes.number.isRequired,
  setOverlayOpacity: PropTypes.func.isRequired,
  blurAmount: PropTypes.number.isRequired,
  setBlurAmount: PropTypes.func.isRequired,
  fontFamily: PropTypes.string.isRequired,
  setFontFamily: PropTypes.func.isRequired,
  fontSize: PropTypes.number.isRequired,
  setFontSize: PropTypes.func.isRequired,
  showMessage: PropTypes.func.isRequired,
};