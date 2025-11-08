// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import CarListing from './components/CarListing';
import CarDetails from './components/CarDetails';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import Footer from './components/Footer';
import UpcomingCarsPage from './components/UpcomingCarsPage';   

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<CarListing />} />
        <Route path="/car/:id" element={<CarDetails />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/upcoming-cars" element={<UpcomingCarsPage />} />   
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;