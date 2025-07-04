import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const Clock = () => {
  const [time, setTime] = useState(new Date());
  const [format24Hour, setFormat24Hour] = useState(true);

  useEffect(() => {
    const timerId = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timerId);
  }, []);

  const formatTime = (date) => {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    let ampm = '';

    if (!format24Hour) {
      ampm = hours >= 12 ? ' PM' : ' AM';
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
    }

    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;

    return `${hours}:${minutes}:${seconds}${ampm}`;
  };

  return (
    <div style={{
      color: 'white',
      fontSize: '4em', /* Larger font size */
      fontWeight: 'bold',
      textShadow: '2px 2px 6px rgba(0,0,0,0.7)', /* Stronger shadow */
      position: 'relative',
      zIndex: 1,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      height: '100%',
      boxSizing: 'border-box'
    }}>
      {formatTime(time)}
      <button
        onClick={() => setFormat24Hour(!format24Hour)}
        style={{
          marginTop: '15px',
          padding: '8px 15px',
          backgroundColor: 'rgba(255,255,255,0.3)',
          border: 'none',
          borderRadius: '8px',
          color: 'white',
          cursor: 'pointer',
          fontSize: '0.8em',
          fontWeight: 'normal',
          backdropFilter: 'blur(3px)',
          WebkitBackdropFilter: 'blur(3px)',
          transition: 'background-color 0.3s ease', /* Smooth transition */
        }}
        onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.5)'}
        onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.3)'}
      >
        {format24Hour ? '12-Hour' : '24-Hour'}
      </button>
    </div>
  );
};

export default Clock;