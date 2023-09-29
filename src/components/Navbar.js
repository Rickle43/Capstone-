import React from 'react';
import { Link } from 'react-router-dom';
import CustomNavbar from './CustomNavbar'; // Import the CustomNavbar component
import './css/Navbar.css';

const Navbar = ({ }) => {//isLoggedIn, onLogout, username }) => {
  return (
    <header>
      <CustomNavbar /> {/* Render the CustomNavbar component here */}
      {/* Rest of your Navbar.js component */}
    </header>
  );
};

export default Navbar;
