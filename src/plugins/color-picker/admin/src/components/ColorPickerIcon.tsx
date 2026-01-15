import React from 'react';

const ColorPickerIcon = () => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="12" cy="12" r="10" fill="url(#colorGradient)" />
      <defs>
        <linearGradient
          id="colorGradient"
          x1="2"
          y1="12"
          x2="22"
          y2="12"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FF6B6B" />
          <stop offset="0.25" stopColor="#FFE66D" />
          <stop offset="0.5" stopColor="#4ECDC4" />
          <stop offset="0.75" stopColor="#45B7D1" />
          <stop offset="1" stopColor="#96CEB4" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default ColorPickerIcon;
