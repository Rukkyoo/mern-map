import React from 'react';

const RouteInfo = ({ distance, duration }) => {
  if (!distance || !duration) return null;

  return (
    <div className="mt-6 bg-gray-800 p-6 rounded-sm w-full max-w-md border border-gray-700">
      <h3 className="text-lg font-bold text-white mb-4">Route Information</h3>
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-gray-300">Distance:</span>
          <span className="text-white font-semibold">{distance}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-300">Duration:</span>
          <span className="text-white font-semibold">{duration}</span>
        </div>
      </div>
    </div>
  );
};

export default RouteInfo;