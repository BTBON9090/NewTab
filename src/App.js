import React, { useState } from 'react';
import Settings from './components/Settings';
import Clock from './components/Clock';
import SearchBar from './components/SearchBar';
import QuickLinks from './components/QuickLinks';
import AnnouncementBar from './components/AnnouncementBar';
import EnterpriseDrive from './components/EnterpriseDrive';
import OtherModule from './components/OtherModule';
import '../style.css'; // Import the main stylesheet

const App = () => {
  // State for background settings
  const [backgroundType, setBackgroundType] = useState('color'); // 'color', 'url', 'local'
  const [backgroundColor, setBackgroundColor] = useState('#f0f0f0');
  const [backgroundImageUrl, setBackgroundImageUrl] = useState('');
  const [backgroundLocalImage, setBackgroundLocalImage] = useState(null);
  const [overlayOpacity, setOverlayOpacity] = useState(0.5);
  const [blurAmount, setBlurAmount] = useState(0);

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
    <div style={getBackgroundStyle()} className="app-container">
      <div style={getOverlayStyle()}></div>
      <Clock />
      <SearchBar />
      <QuickLinks />
      <AnnouncementBar />
      <EnterpriseDrive />
      <OtherModule />
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
      />
    </div>
  );
};

export default App;