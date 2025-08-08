import React from 'react';
import LocationInput from './LocationInput';
import SuggestionsList from './SuggestionsList';

const RouteForm = ({
  origin,
  destination,
  suggestions,
  onInputChange,
  onSuggestionClick,
  onSubmit,
  isLoading
}) => {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
      className="w-full max-w-md bg-gray-800 p-6 rounded-sm shadow-lg border border-gray-700"
    >
      <h2 className="text-xl font-bold text-white mb-6 text-center">
        Route Calculator
      </h2>
      
      <LocationInput
        label="Origin"
        value={origin}
        onChange={onInputChange}
        placeholder="Enter starting location"
        inputType="origin"
      />
      
      <LocationInput
        label="Destination"
        value={destination}
        onChange={onInputChange}
        placeholder="Enter destination"
        inputType="destination"
      />
      
      <SuggestionsList
        suggestions={suggestions}
        onSuggestionClick={onSuggestionClick}
      />
      
      <button
        type="submit"
        disabled={isLoading}
        className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed p-3 rounded-sm w-full text-white font-semibold transition-colors focus:ring-2 focus:ring-blue-500/20 focus:outline-hidden"
      >
        {isLoading ? 'Calculating...' : 'Calculate Route'}
      </button>
    </form>
  );
};

export default RouteForm;