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

  // Route Computation
  const computeRoute = async () => {
    try {
      const response = await axiosInstance.post("/route", {
        origin,
        destination,
      });
      setRoute(response.data.routes[0]);
    } catch (error) {
      console.log(error);
    }
  };

  // Handles the change event for the origin input field
  const handleOriginChange = (value) => {
    setOrigin(value);
    fetchSuggestions(value);
  };

  // Handles the change event for the destination input field
  const handleDestinationChange = (value) => {
    setDestination(value);
    fetchSuggestions(value);
  };

  // Handles the click event for the suggestion
  const handleSuggestionClick = (suggestion) => {
    setInput(suggestion.placePrediction.text.text);
    setSuggestions([]);
  };

  return (
    <div className="bg-black h-screen flex justify-center">
      <form className="my-10 flex flex-col items-center">
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
        {/*  <div className="flex flex-col mt-8 justify-between px-2 items-center w-screen">
          {" "}
          <div>
            <label className="mb-1 mt-6" for="origin">
              <span className="mb-10 text-white">Origin: </span>{" "}
            </label>
            <input
              className="p-1 mb-2 w-55 text-sm text-gray-700 bg-gray-200 border border-white rounded-sm focus:outline-none focus:ring-2 focus:ring-gray-600"
              type="search"
              placeholder="Where are you coming from?"
            ></input>
          </div>
          <div>
            <label className="mb-1 mt-6" for="origin">
              <span className="mb-10 text-white">Destination: </span>{" "}
            </label>
            <input
              className="p-1 mb-2 w-55 text-sm text-gray-700 bg-gray-200 border border-white rounded-sm focus:outline-none focus:ring-2 focus:ring-gray-600"
              type="search"
              placeholder="Where are you going to?"
            ></input>
          </div>
          <button className="bg-slate-200 rounded-md p-1 cursor-pointer">
            Calculate Route
          </button>
        </div> */}
      </form>
    </div>
  );
}

export default App;
