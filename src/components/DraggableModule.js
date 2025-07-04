import React from 'react';
import PropTypes from 'prop-types';
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
      grid={[50, 50]} /* 30px cell + 20px gap = 50px */
    >
      <div style={{
        position: 'absolute', // Keep absolute for draggable, but grid will override
        cursor: 'grab',
        padding: '20px', /* Increased padding */
        border: 'none', /* Remove border */
        borderRadius: '12px', /* More rounded corners */
        boxShadow: '0 6px 12px rgba(0,0,0,0.3)', /* Stronger shadow */
        minWidth: '250px', /* Slightly wider */
        minHeight: '120px', /* Slightly taller */
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.15)', /* Slightly less transparent */
        color: 'white',
        textShadow: '1px 1px 3px rgba(0,0,0,0.6)', /* Stronger text shadow */
        backdropFilter: 'blur(5px)', /* Add blur to module background */
        WebkitBackdropFilter: 'blur(5px)' /* For Safari compatibility */
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

DraggableModule.propTypes = {
  id: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};