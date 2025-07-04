import React, { useState, useEffect } from 'react';

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
      fontSize: '3em', 
      fontWeight: 'bold', 
      textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
      position: 'relative',
      zIndex: 1
    }}>
      {formatTime(time)}
      <button 
        onClick={() => setFormat24Hour(!format24Hour)}
        style={{
          marginLeft: '10px',
          padding: '5px 10px',
          backgroundColor: 'rgba(255,255,255,0.2)',
          border: 'none',
          borderRadius: '5px',
          color: 'white',
          cursor: 'pointer'
        }}
      >
        {format24Hour ? '12-Hour' : '24-Hour'}
      </button>
    </div>
  );
};

export default Clock;