import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const Message = ({ message, type, duration = 3000 }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (message) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [message, duration]);

  if (!visible) return null;

  const style = {
    position: 'fixed',
    top: '20px',
    left: '50%',
    transform: 'translateX(-50%)',
    padding: '10px 20px',
    borderRadius: '5px',
    color: 'white',
    zIndex: 9999,
    backgroundColor: type === 'success' ? '#28a745' : type === 'error' ? '#dc3545' : '#007bff',
    opacity: visible ? 1 : 0,
    transition: 'opacity 0.5s ease-in-out',
  };

  return (
    <div style={style}>
      {message}
    </div>
  );
};

Message.propTypes = {
  message: PropTypes.string,
  type: PropTypes.oneOf(['success', 'error', 'info']),
  duration: PropTypes.number,
};

export default Message;