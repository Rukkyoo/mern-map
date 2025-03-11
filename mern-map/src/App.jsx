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

  // Fetching the autocomplete suggestions
  const fetchSuggestions = async (input) => {
    try {
      const response = await axiosInstance.post("/", {
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

  // Handles the change event for the input field
  const handleAutoCompleteChange = (e) => {
    setInput(e.target.value);
    fetchSuggestions(e.target.value);
  };

  // Handles the click event for the suggestion
  const handleSuggestionClick = (suggestion) => {
    setInput(suggestion.placePrediction.text.text);
    setSuggestions([]);
  };

  return (
    <div className="bg-black h-screen flex justify-center">
      <form className="my-10 flex flex-col items-center">
        <div>
          <label for="search">
            <span className="mr-2 text-white">Check Map: </span>{" "}
          </label>
          <input
            type="search"
            onChange={handleAutoCompleteChange}
            value={input}
            class="p-1 mb-2 w-80 text-sm text-gray-700 bg-gray-200 border border-white rounded-sm focus:outline-none focus:ring-2 focus:ring-gray-600"
            placeholder="Search..."
          ></input>
        </div>
        <ul>
          {suggestions.map((suggestion) => (
            <li
              key={suggestion.placePrediction.place_id}
              onClick={() => handleSuggestionClick(suggestion)}
              className="cursor-pointer w-80 bg-slate-200 hover:bg-gray-300"
            >
              {suggestion.placePrediction.text.text}
            </li>
          ))}
        </ul>
      </form>
    </div>
  );
}

export default App;
