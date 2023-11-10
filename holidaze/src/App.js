

import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import Layout from "./Components/Layout";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Profile from "./Pages/Profile";
import { Venue } from "./Components/Venue";
import RouteNotFound from "./Components/Layout/RouteNotFound";

import Logout from './Pages/Logout';

function App() {

  const [venues, setVenues] = useState([]);

  const onVenueSearch = (filteredSuggestions) => {
    setVenues(filteredSuggestions);
  }

  useEffect(() => {
    fetch(`https://api.noroff.dev/api/v1/holidaze/venues`)
      .then((response) => response.json())
      .then((data) => setVenues(data))
      .catch((error) => console.error(`Error fetching products:`, error));
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Layout onSearch={onVenueSearch} venues={venues} />} >
        <Route index element={<Home filterVenue={venues} />} />
        <Route path="login" element={<Login />} />
        <Route path="logout" element={<Logout />} />
        <Route path="register" element={<Register />} />
        <Route path="Profile" element={<Profile />} />
        <Route path="venue/:id" element={<Venue />} />
        <Route path="*" element={<RouteNotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
