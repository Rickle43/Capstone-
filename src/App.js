import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProductList from './components/ProductList';
import ProductDetails from './components/ProductDetails';
import CustomNavbar from './components/CustomNavbar';
import Cart from './components/Cart';
import Login from './components/Login';

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true');
  const [username, setUsername] = useState(localStorage.getItem('username') || '');
  const [categoryFilter, setCategoryFilter] = useState(''); // Add categoryFilter state
  const [priceRangeFilter, setPriceRangeFilter] = useState(''); // Add priceRangeFilter state

  const handleLogin = (status, user) => {
    setIsLoggedIn(status);
    setUsername(user);
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('username');
    setIsLoggedIn(false);
    setUsername('');
  };

  const applyFilters = (categoryFilter, priceRangeFilter) => {
    // Set the category and price range filters here
    setCategoryFilter(categoryFilter);
    setPriceRangeFilter(priceRangeFilter);
  };

  const addToCart = (productToAdd) => {
    const existingCartItem = cartItems.find((item) => item.id === productToAdd.id);

    if (existingCartItem) {
      const updatedCartItems = cartItems.map((item) => {
        if (item.id === productToAdd.id) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });
      setCartItems(updatedCartItems);
    } else {
      setCartItems([...cartItems, { ...productToAdd, quantity: 1 }]);
    }
  };

  return (
    <Router>
      <div>
        <CustomNavbar isLoggedIn={isLoggedIn} username={username} onLogout={handleLogout} applyFilters={applyFilters} cartItems={cartItems} />
        <header className="bg-dark py-5">
          <div className="container px-4 px-lg-5 my-5">
            <div className="text-center text-white">
              <h1 className="display-4 fw-bolder">Shop in style</h1>
              <p className="lead fw-normal text-white-50 mb-0">With this shop homepage template</p>
            </div>
          </div>
        </header>
        <Routes>
          <Route path="/" element={<ProductList cartItems={cartItems} setCartItems={setCartItems} categoryFilter={categoryFilter} 
          priceRangeFilter={priceRangeFilter} addToCart={addToCart} />} />
          <Route path="/product/:productId" element={<ProductDetails addToCart={addToCart} />} />
          <Route path="/cart" element={<Cart cartItems={cartItems} setCartItems={setCartItems} />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
        </Routes>

      </div>
    </Router>
  );
}

export default App;
