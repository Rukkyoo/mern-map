import React from 'react';

const SuggestionsList = ({ suggestions, onSuggestionClick }) => {
  if (suggestions.length === 0) return null;

  return (
    <ul className="bg-gray-800 rounded-sm mb-4 border border-gray-700 shadow-lg">
      {suggestions.map((suggestion, idx) => (
        <li
          key={idx}
          onClick={() => onSuggestionClick(suggestion)}
          className="p-3 cursor-pointer hover:bg-gray-700 text-white border-b border-gray-700 last:border-b-0 transition-colors"
        >
          <div className="text-sm">
            {suggestion.properties.label || suggestion.properties.name}
          </div>
          {suggestion.properties.country && (
            <div className="text-xs text-gray-400 mt-1">
              {suggestion.properties.country}
            </div>
          )}
        </li>
      ))}
    </ul>
  );
};

export default SuggestionsList;