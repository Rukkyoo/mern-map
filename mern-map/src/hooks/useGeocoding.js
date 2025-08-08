import { useState, useCallback } from 'react';
import axios from 'axios';

export const useGeocoding = () => {
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const searchLocations = useCallback(async (query) => {
    if (!query || query.length < 3) {
      setSuggestions([]);
      return;
    }

    setIsLoading(true);
    try {
      // Using Photon API for geocoding (free and no API key required)
      const response = await axios.get(
        `https://photon.komoot.io/api/?q=${encodeURIComponent(query)}&limit=5`,
        {
          timeout: 5000,
        }
      );
      
      if (response.data && response.data.features) {
        setSuggestions(response.data.features);
      } else {
        setSuggestions([]);
      }
    } catch (error) {
      console.error('Geocoding error:', error);
      setSuggestions([]);
      
      // Fallback to Nominatim if Photon fails
      try {
        const fallbackResponse = await axios.get(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=5`,
          {
            timeout: 5000,
            headers: {
              'User-Agent': 'MERN-Map-App/1.0'
            }
          }
        );
        
        // Convert Nominatim format to Photon format
        const convertedFeatures = fallbackResponse.data.map(item => ({
          geometry: {
            coordinates: [parseFloat(item.lon), parseFloat(item.lat)]
          },
          properties: {
            name: item.name,
            label: item.display_name,
            country: item.address?.country
          }
        }));
        
        setSuggestions(convertedFeatures);
      } catch (fallbackError) {
        console.error('Fallback geocoding error:', fallbackError);
        setSuggestions([]);
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  const clearSuggestions = useCallback(() => {
    setSuggestions([]);
  }, []);

  return {
    suggestions,
    isLoading,
    searchLocations,
    clearSuggestions
  };
};