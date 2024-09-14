import React from 'react';
import './AnimatedButton.css';

const AnimatedButton = ({ text }) => {
  return (
    <button className="animated-button">
      {text}
    </button>
  );
};

export default AnimatedButton;
