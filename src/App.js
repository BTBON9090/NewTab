import React, { useState } from 'react';
import Settings from './components/Settings';
import Clock from './components/Clock';
import SearchBar from './components/SearchBar';
import QuickLinks from './components/QuickLinks';
import AnnouncementBar from './components/AnnouncementBar';
import EnterpriseDrive from './components/EnterpriseDrive';
import OtherModule from './components/OtherModule';
import DraggableModule from './components/DraggableModule';
import '../style.css'; // Import the main stylesheet

const App = () => {
  // State for background settings
  const [backgroundType, setBackgroundType] = useState('color'); // 'color', 'url', 'local'
  const [backgroundColor, setBackgroundColor] = useState('#f0f0f0');
  const [backgroundImageUrl, setBackgroundImageUrl] = useState('');
  const [backgroundLocalImage, setBackgroundLocalImage] = useState(null);
  const [overlayOpacity, setOverlayOpacity] = useState(0.5);
  const [blurAmount, setBlurAmount] = useState(0);
  const [fontFamily, setFontFamily] = useState('sans-serif');
  const [fontSize, setFontSize] = useState(16);

  const [showSettings, setShowSettings] = useState(false);

  // Function to apply background styles
  const getBackgroundStyle = () => {
    let style = {};
    if (backgroundType === 'color') {
      style.backgroundColor = backgroundColor;
    } else if (backgroundType === 'url' && backgroundImageUrl) {
      style.backgroundImage = `url(${backgroundImageUrl})`;
      style.backgroundSize = 'cover';
      style.backgroundPosition = 'center';
    } else if (backgroundType === 'local' && backgroundLocalImage) {
      style.backgroundImage = `url(${URL.createObjectURL(backgroundLocalImage)})`;
      style.backgroundSize = 'cover';
      style.backgroundPosition = 'center';
    }

    return style;
  };

  // Function to apply overlay styles
  const getOverlayStyle = () => {
    return {
      backgroundColor: 'rgba(0, 0, 0, ' + overlayOpacity + ')',
      backdropFilter: `blur(${blurAmount}px)`,
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
    };
  };

  return (
    <div style={{...getBackgroundStyle(), fontFamily: fontFamily, fontSize: `${fontSize}px`}} className="app-container">
      <div style={getOverlayStyle()}></div>
      
      {showSettings && (
        <Settings
          backgroundType={backgroundType}
          setBackgroundType={setBackgroundType}
          backgroundColor={backgroundColor}
          setBackgroundColor={setBackgroundColor}
          backgroundImageUrl={backgroundImageUrl}
          setBackgroundImageUrl={setBackgroundImageUrl}
          backgroundLocalImage={backgroundLocalImage}
          setBackgroundLocalImage={setBackgroundLocalImage}
          overlayOpacity={overlayOpacity}
          setOverlayOpacity={setOverlayOpacity}
          blurAmount={blurAmount}
          setBlurAmount={setBlurAmount}
          fontFamily={fontFamily}
          setFontFamily={setFontFamily}
          fontSize={fontSize}
          setFontSize={setFontSize}
        />
      )}

      <button 
        onClick={() => setShowSettings(!showSettings)}
        style={{
          position: 'absolute',
          top: '20px',
          left: '20px',
          zIndex: 101,
          padding: '10px 15px',
          backgroundColor: 'rgba(0,0,0,0.5)',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer'
        }}
      >
        {showSettings ? 'Hide Settings' : 'Show Settings'}
      </button>

      <DraggableModule id="clock-module">
        <Clock />
      </DraggableModule>

      <DraggableModule id="search-bar-module">
        <SearchBar />
      </DraggableModule>

      <DraggableModule id="quick-links-module">
        <QuickLinks />
      </DraggableModule>

      <DraggableModule id="announcement-bar-module">
        <AnnouncementBar />
      </DraggableModule>

      <DraggableModule id="enterprise-drive-module">
        <EnterpriseDrive />
      </DraggableModule>

      <DraggableModule id="other-module">
        <OtherModule />
      </DraggableModule>

    </div>
  );
};

export default App;