import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link component
import Login from './Login';

const CustomNavbar = ({ isLoggedIn, onLogout, applyFilters, cartItems }) => {
  const [showLogin, setShowLogin] = useState(!isLoggedIn); // Show login initially if not logged in
  const [username, setUsername] = useState(localStorage.getItem('username') || ''); // Initialize with username from localStorage
  const [categoryFilter, setCategoryFilter] = useState('');
  const [priceRangeFilter, setPriceRangeFilter] = useState('');

  const handleLogin = (status, user) => {
    // Set the username in state and localStorage
    setUsername(user);
    localStorage.setItem('username', user);
    // Hide the login component upon successful login
    setShowLogin(false);
  };

  // Function to handle logout
  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('username');
    // Clear the username in state
    setUsername('');
    // Set the showLogin state to true to show the login component
    setShowLogin(true);
    // Call the onLogout callback
    onLogout();
  };

  // Function to handle filter changes
  const handleFilterChange = (category, priceRange) => {
    setCategoryFilter(category);
    setPriceRangeFilter(priceRange);

    // Call the applyFilters callback to apply filters to ProductList
    applyFilters(category, priceRange);
  };

  // Calculate the total number of items in the cart
  const totalItemsInCart = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container px-4 px-lg-5">
        <a className="navbar-brand" href="#!">Start Bootstrap</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
          aria-label="Toggle navigation"><span className="navbar-toggler-icon"></span></button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-4">
            <li className="nav-item">
              <Link className="nav-link active" to="/">Home</Link> {/* Use Link component */}
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" id="navbarDropdown" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Shop
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                <li>
                  <Link className="dropdown-item" to="/" onClick={() => handleFilterChange('', '')} // Clear filters for 'All Products'
                  > All Products </Link>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <Link className="dropdown-item" to="/" onClick={() => handleFilterChange('men\'s clothing', '')} // Apply Popular Items filter
                  > Men's Clothing </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/" onClick={() => handleFilterChange('women\'s clothing', '')} // Apply New Arrivals filter
                  > Women's Clothing </Link>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <Link className="dropdown-item" to="/" onClick={() => handleFilterChange('jewelry', '')} // Apply New Arrivals filter
                  > Jewelry </Link>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <Link className="dropdown-item" to="/" onClick={() => handleFilterChange('electronics', '')} // Apply New Arrivals filter
                  > Electronics </Link>
                </li>
              </ul>
            </li>
          </ul>
          {showLogin ? (
            <Login onLogin={handleLogin} />
          ) : (
            <>
              <span className="navbar-text me-2">Welcome: {username}</span>
              <button className="btn btn-outline-dark me-2" onClick={handleLogout}>Logout</button>

            </>
          )}
          <Link className="btn btn-outline-dark" to="/cart">
            <i className="bi-cart-fill me-1"></i>
            Cart
            <span className="badge bg-dark text-white ms-1 rounded-pill">{totalItemsInCart}</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default CustomNavbar;
