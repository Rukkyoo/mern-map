import "./App.css";
import React, { useState } from "react";
import axios from "axios";
import axiosInstance from "./axiosInstance";

function App() {
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [route, setRoute] = useState(null);
  const [activeInput, setActiveInput] = useState(null); // Track which input is active

  // Fetching the autocomplete suggestions
  const fetchSuggestions = async (input) => {
    try {
      const response = await axiosInstance.post("/autocomplete", {
        input,
        locationBias: {
          circle: {
            center: {
              latitude: 37.76999,
              longitude: -122.44696,
            },
            radius: 500.0,
          },
        },
      });
      setSuggestions(response.data.suggestions);
    } catch (error) {
      console.log(error);
    }
  };

  // Route Computation
  const computeRoute = async () => {
    try {
      const response = await axiosInstance.post("/route", {
        origin,
        destination,
      });
      setRoute(response.data.routes[0]);
      console.log(response.data.routes[0]);
    } catch (error) {
      console.log(error);
    }
  };

  // Handles the change event for the origin input field
  const handleOriginChange = (value) => {
    setOrigin(value);
    setActiveInput("origin"); // Set the active input to origin
    fetchSuggestions(value);
  };

  // Handles the change event for the destination input field
  const handleDestinationChange = (value) => {
    setDestination(value);
    setActiveInput("destination"); // Set the active input to destination
    fetchSuggestions(value);
  };

  // Handles the click event for the suggestion
  const handleSuggestionClick = (suggestion) => {
    const selectedText = suggestion.placePrediction.text.text;
    if (activeInput === "origin") {
      setOrigin(selectedText);
    } else if (activeInput === "destination") {
      setDestination(selectedText);
    }
    setSuggestions([]);
  };

  return (
    <div className="bg-black h-screen flex justify-center">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          computeRoute();
        }}
        className="my-10 flex flex-col items-center"
      >
        <label className="mb-3" for="search">
          <span className="mb-10 text-white">Current Location: </span>{" "}
        </label>
        <input
          type="search"
          onChange={(e) => handleOriginChange(e.target.value)}
          value={origin}
          class="p-1 mb-2 w-80 text-sm text-gray-700 bg-gray-200 border border-white rounded-sm focus:outline-none focus:ring-2 focus:ring-gray-600"
          placeholder="Where are you coming from?"
        ></input>

        <label className="mb-3" for="search">
          <span className="mb-10 text-white">Destination: </span>{" "}
        </label>
        <input
          type="search"
          onChange={(e) => handleDestinationChange(e.target.value)}
          value={destination}
          class="p-1 mb-2 w-80 text-sm text-gray-700 bg-gray-200 border border-white rounded-sm focus:outline-none focus:ring-2 focus:ring-gray-600"
          placeholder="Where are you going to?"
        ></input>

        <ul>
          {suggestions.map((suggestion) => (
            <li
              key={suggestion.placePrediction.place_id}
              onClick={() => handleSuggestionClick(suggestion)}
              className="cursor-pointer  w-80 bg-slate-200 hover:bg-gray-300"
            >
              {suggestion.placePrediction.text.text}
            </li>
          ))}
        </ul>
        <button
          type="submit"
          className="bg-slate-200 mt-10 rounded-md p-1 cursor-pointer"
        >
          Calculate Route
        </button>
      </form>
    </div>
  );
}

export default App;
