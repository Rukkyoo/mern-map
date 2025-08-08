import React from 'react';

const LocationInput = ({ 
  label, 
  value, 
  onChange, 
  placeholder, 
  inputType 
}) => {
  return (
    <div className="mb-4">
      <label className="text-sm font-bold mb-2 block text-white">
        {label}
      </label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value, inputType)}
        className="w-full p-3 text-gray-900 bg-white rounded-sm border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-hidden transition-colors"
        placeholder={placeholder}
      />
    </div>
  );
};

export default LocationInput;