import React, { useState } from "react";
import "../styling/userSearchForm.css";

function UserSearchForm() {
  const [inputValue, setInputValue] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("na1");

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleRegionChange = (event) => {
    setSelectedRegion(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Reset the input value
    setInputValue("");
    redirectToUserPage(selectedRegion, inputValue);
  };

  const redirectToUserPage = (region, summonerName) => {
    const userPageURL = `/user/${region}/${summonerName}`;
    window.location.href = userPageURL;
  };

  return (
    <form onSubmit={handleSubmit} className="user-search-form">
      <label>
        Region:
        <select
          value={selectedRegion}
          onChange={handleRegionChange}
          className="form-control"
        >
          <option value="na1">NA</option>
          <option value="euw1">EUW</option>
          <option value="eun1">EUNE</option>
          {/* Add more regions as needed */}
        </select>
      </label>
      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
        className="form-control"
      />
      <button type="submit" className="btn btn-primary">
        Send
      </button>
    </form>
  );
}

export default UserSearchForm;
