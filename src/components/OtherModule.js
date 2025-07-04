import React from 'react';
import PropTypes from 'prop-types';

const OtherModule = React.memo(() => {
  return (
    <div style={{
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
      padding: '10px 20px',
      borderRadius: '8px',
      marginTop: '20px',
      width: '80%',
      textAlign: 'center',
      position: 'relative',
      zIndex: 1,
      color: 'white',
      textShadow: '1px 1px 2px rgba(0,0,0,0.5)'
    }}>
      <h3>其他模块</h3>
      <p>这是一个通用模块，可用于未来扩展或自定义内容。</p>
    </div>
  );
});

export default OtherModule;