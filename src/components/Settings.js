import React, { useState, useEffect } from 'react';

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
        // Note: local images cannot be directly saved/loaded via localStorage due to security restrictions.
        // For local images, users will need to re-upload them.
        overlayOpacity,
        blurAmount,
        fontFamily,
        fontSize
      };
      saveThemes({ ...themes, [themeName]: newTheme });
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
    }
  };

  return (
    <div style={{ 
      position: 'absolute',
      top: '20px',
      right: '20px',
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
      padding: '20px',
      borderRadius: '8px',
      zIndex: 100
    }}>
      <h3>Background Settings</h3>
      <div>
        <label>Background Type:</label>
        <select value={backgroundType} onChange={(e) => setBackgroundType(e.target.value)}>
          <option value="color">Solid Color</option>
          <option value="url">Image URL</option>
          <option value="local">Local Image</option>
        </select>
      </div>

      {backgroundType === 'color' && (
        <div>
          <label>Color:</label>
          <input type="color" value={backgroundColor} onChange={(e) => setBackgroundColor(e.target.value)} />
        </div>
      )}

      {backgroundType === 'url' && (
        <div>
          <label>Image URL:</label>
          <input 
            type="text" 
            value={backgroundImageUrl} 
            onChange={(e) => setBackgroundImageUrl(e.target.value)} 
            placeholder="Enter image URL"
          />
        </div>
      )}

      {backgroundType === 'local' && (
        <div>
          <label>Upload Local Image:</label>
          <input 
            type="file" 
            accept="image/*" 
            onChange={(e) => setBackgroundLocalImage(e.target.files[0])} 
          />
        </div>
      )}

      <h4>Overlay Settings</h4>

      <h4>Font Settings</h4>
      <div>
        <label>Font Family:</label>
        <select value={fontFamily} onChange={(e) => setFontFamily(e.target.value)}>
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
      <div>
        <label>Font Size:</label>
        <input type="range" min="12" max="36" step="1" value={fontSize} onChange={(e) => setFontSize(parseInt(e.target.value))} />
        <span>{fontSize}px</span>
      </div>
      <div>
        <label>Opacity:</label>
        <input 
          type="range" 
          min="0" 
          max="1" 
          step="0.01" 
          value={overlayOpacity} 
          onChange={(e) => setOverlayOpacity(parseFloat(e.target.value))} 
        />
        <span>{Math.round(overlayOpacity * 100)}%</span>
      </div>

      <div>
        <label>Blur Amount (px):</label>
        <input 
          type="range" 
          min="0" 
          max="20" 
          step="1" 
          value={blurAmount} 
          onChange={(e) => setBlurAmount(parseInt(e.target.value))} 
        />
        <span>{blurAmount}px</span>
      </div>

      <h4>Themes</h4>
      <div>
        <button onClick={handleSaveTheme}>Save Current Theme</button>
        <select id="theme-select" onChange={handleLoadTheme}>
          <option value="">Load Theme</option>
          {Object.keys(themes).map((themeName) => (
            <option key={themeName} value={themeName}>{themeName}</option>
          ))}
        </select>
        <button onClick={handleDeleteTheme}>Delete Selected Theme</button>
      </div>
    </div>
  );
};

export default Settings;