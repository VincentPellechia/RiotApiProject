import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import User from "./pages/userPage";
import Home from "./pages/home";
import UserSearchForm from "./components/userSearchForm"; // Import the new component
import "./styling/App.css";

function App() {
  return (
    <div className="App">
      <UserSearchForm /> {/* Render the UserSearchForm component */}
      <Routes>
        <Route path="/" element={<Home />} />
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
