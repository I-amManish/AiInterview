import React from 'react';

const SpinnerLoader = ({ size = 5, color = 'text-black' }) => {
  return (
    <div className="flex justify-center items-center">
      <div
        className={`animate-spin rounded-full border-2 border-t-transparent ${color}`}
        style={{
          width: `${size * 4}px`,    // Tailwind scale (e.g., 5 -> 20px)
          height: `${size * 4}px`,
          borderColor: '#e5e7eb', // gray-200 border
          borderTopColor: 'currentColor', // use text color
        }}
      />
    </div>
  );
};

export default SpinnerLoader;
