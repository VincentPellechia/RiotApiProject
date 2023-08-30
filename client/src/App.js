import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import User from "./user.js";
import "./App.css";

function App() {
  const [inputValue, setInputValue] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('na1');
  const navigate = useNavigate();

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleRegionChange = (event) => {
    setSelectedRegion(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Reset the input value
    setInputValue('');
    navigate(`/user/${selectedRegion}/${inputValue}`);
  };

  return (
    <div className="App">
      
      <form onSubmit={handleSubmit}>
      <label>
          Region:
          <select value={selectedRegion} onChange={handleRegionChange}>
            <option value="na1">NA</option>
            <option value="euw1">EUW</option>
            <option value="eun1">EUNE</option>
            {/* Add more regions as needed */}
          </select>
        </label>
        <input type="text" value={inputValue} onChange={handleChange} />
        <button type="submit">Send</button>
      </form>
      <Routes>
          <Route path="/user/:region/:userName" element={<User />} />
      </Routes>
    </div>
    
  );
}

function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default AppWrapper;