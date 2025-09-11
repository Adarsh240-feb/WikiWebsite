import React from 'react';
import './WavyText.css';

const WavyText = ({ text }) => {
  return (
    <h2 className="section-heading">
      {text.split('').map((char, index) => (
        <span key={index} style={{ animationDelay: `${index * 0.15}s` }}>
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </h2>
  );
};

export default WavyText;