import React from 'react';

const Settings = ({ 
  backgroundType, setBackgroundType,
  backgroundColor, setBackgroundColor,
  backgroundImageUrl, setBackgroundImageUrl,
  backgroundLocalImage, setBackgroundLocalImage,
  overlayOpacity, setOverlayOpacity,
  blurAmount, setBlurAmount
}) => {
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
    </div>
  );
};

export default Settings;