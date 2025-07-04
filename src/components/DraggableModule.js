import React from 'react';
import Draggable from 'react-draggable';

const DraggableModule = ({ id, children }) => {
  const [position, setPosition] = React.useState(() => {
    const storedPos = localStorage.getItem(`module-pos-${id}`);
    return storedPos ? JSON.parse(storedPos) : { x: 0, y: 0 };
  });

  const handleStop = (e, data) => {
    const newPosition = { x: data.x, y: data.y };
    setPosition(newPosition);
    localStorage.setItem(`module-pos-${id}`, JSON.stringify(newPosition));
  };

  return (
    <Draggable
      handle=".handle"
      defaultPosition={position}
      onStop={handleStop}
    >
      <div style={{
        position: 'absolute', // Allow absolute positioning for drag
        cursor: 'grab',
        padding: '10px',
        border: '1px solid rgba(255,255,255,0.3)',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
        minWidth: '200px',
        minHeight: '100px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.1)', // Semi-transparent background
        color: 'white',
        textShadow: '1px 1px 2px rgba(0,0,0,0.5)'
      }}>
        <div className="handle" style={{ width: '100%', textAlign: 'center', cursor: 'move', marginBottom: '10px', fontWeight: 'bold' }}>
          Drag Me
        </div>
        {children}
      </div>
    </Draggable>
  );
};

export default DraggableModule;