import React from 'react';

// Only show this component in development mode
const PopupDevTools: React.FC = () => {
  if (import.meta.env.MODE !== 'development') {
    return null;
  }
  
  
  return (
    <div 
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        background: '#f1f1f1',
        padding: '10px',
        borderRadius: '5px',
        boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
        zIndex: 999
      }}
    >
      <h4 style={{ margin: '0 0 10px', fontSize: '14px' }}>Popup Dev Tools</h4>
      <button
        style={{
          background: '#4caf50',
          color: 'white',
          border: 'none',
          padding: '8px 12px',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '12px'
        }}
      >
        Reset First-Time Visit Status
      </button>
    </div>
  );
};

export default PopupDevTools;