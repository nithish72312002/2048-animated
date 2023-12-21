import React from 'react';

export default function DirectionButton({ direction, onClick, children }) {
  return (
    <button className='direction-button' onClick={onClick}>
      {children}
    </button>
  );
}
