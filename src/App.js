import React, { useState, useEffect } from 'react';
import Settings from './components/Settings';
import Clock from './components/Clock';
import SearchBar from './components/SearchBar';
import QuickLinks from './components/QuickLinks';
import AnnouncementBar from './components/AnnouncementBar';
import EnterpriseDrive from './components/EnterpriseDrive';
import OtherModule from './components/OtherModule';
import DraggableModule from './components/DraggableModule';
import Message from './components/Message';
import ErrorBoundary from './components/ErrorBoundary';
import '../style.css'; // Import the main stylesheet

const App = () => {
  // State for background settings
  const [backgroundType, setBackgroundType] = useState(() => localStorage.getItem('backgroundType') || 'color');
  const [backgroundColor, setBackgroundColor] = useState(() => localStorage.getItem('backgroundColor') || '#f0f0f0');
  const [backgroundImageUrl, setBackgroundImageUrl] = useState(() => localStorage.getItem('backgroundImageUrl') || '');
  const [backgroundLocalImage, setBackgroundLocalImage] = useState(null); // Local images cannot be directly stored in localStorage
  const [overlayOpacity, setOverlayOpacity] = useState(() => parseFloat(localStorage.getItem('overlayOpacity')) || 0.5);
  const [blurAmount, setBlurAmount] = useState(() => parseInt(localStorage.getItem('blurAmount')) || 0);
  const [fontFamily, setFontFamily] = useState(() => localStorage.getItem('fontFamily') || 'sans-serif');
  const [fontSize, setFontSize] = useState(() => parseInt(localStorage.getItem('fontSize')) || 16);

  useEffect(() => {
    localStorage.setItem('backgroundType', backgroundType);
  }, [backgroundType]);

  useEffect(() => {
    localStorage.setItem('backgroundColor', backgroundColor);
  }, [backgroundColor]);

  useEffect(() => {
    localStorage.setItem('backgroundImageUrl', backgroundImageUrl);
  }, [backgroundImageUrl]);

  // Note: backgroundLocalImage cannot be directly stored in localStorage.
  // We will need to re-upload it or store its URL if it's hosted.

  useEffect(() => {
    localStorage.setItem('overlayOpacity', overlayOpacity);
  }, [overlayOpacity]);

  useEffect(() => {
    localStorage.setItem('blurAmount', blurAmount);
  }, [blurAmount]);

  useEffect(() => {
    localStorage.setItem('fontFamily', fontFamily);
  }, [fontFamily]);

  useEffect(() => {
    localStorage.setItem('fontSize', fontSize);
  }, [fontSize]);

  const [showSettings, setShowSettings] = useState(false);
  const [message, setMessage] = useState(null);

  const showMessage = (msg, type = 'info', duration = 3000) => {
    setMessage({ msg, type, duration });
  };

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
    <ErrorBoundary>
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
          showMessage={showMessage}
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
        <EnterpriseDrive showMessage={showMessage} />
      </DraggableModule>

      <DraggableModule id="other-module">
        <OtherModule />
      </DraggableModule>

      {message && <Message message={message.msg} type={message.type} duration={message.duration} />}

    </div>
    </ErrorBoundary>
  );
};

export default App;