import React from 'react';
import PropTypes from 'prop-types';

const OtherModule = React.memo(() => {
  return (
    <div style={{
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      padding: '15px',
      borderRadius: '12px',
      width: '100%',
      boxSizing: 'border-box',
      textAlign: 'center',
      color: 'white',
      textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      backdropFilter: 'blur(5px)',
      WebkitBackdropFilter: 'blur(5px)'
    }}>
      <h3>其他模块</h3>
      <p>这是一个通用模块，可用于未来扩展或自定义内容。</p>
    </div>
  );
});

export default OtherModule;