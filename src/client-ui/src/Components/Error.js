import React from 'react';

const Error = ({ error }) => {
  return (
    <div style={{ width: '100%', textAlign: 'center' }}>
      {error && (
        <p style={{ color: 'red', fontSize: '1.2rem', fontWeight: 'bold' }}>
          {error}
        </p>
      )}
    </div>
  );
};

export default Error;
