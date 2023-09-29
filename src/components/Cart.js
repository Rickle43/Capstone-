import React, { useState } from 'react';
import './css/Cart.css';

const Cart = ({ cartItems, setCartItems }) => {
  const [isCheckoutVisible, setIsCheckoutVisible] = useState(false);

  const removeFromCart = (itemToRemove) => {
    const updatedCart = cartItems.filter((item) => item.id !== itemToRemove.id);
    setCartItems(updatedCart);
  };

  const handleCheckout = () => {
    // Show the checkout confirmation
    setIsCheckoutVisible(true);
  };

  return (
    <div>
      <h2>Cart</h2>
      <ul>
        {cartItems.map((item) => (
          <div key={item.id} className="cart-item">
            <img src={item.image} alt={item.title} className="cart-image" />
            <div className="cart-info">
              <h5 className="cart-title">{item.title}</h5>
              <p className="cart-price">Price: ${item.price}</p>
              <p>Quantity: {item.quantity}</p>
            </div>
            <button onClick={() => removeFromCart(item)}>Remove</button>
          </div>
        ))}
      </ul>
      <div className="cart-total">
        <p>Total: ${calculateTotal(cartItems)}</p>
      </div>
      <button onClick={handleCheckout} className="btn btn-primary">
        Checkout
      </button>
      {isCheckoutVisible && (
        <div className="checkout-confirmation">
          <p>Thank you for your purchase!</p>
        </div>
      )}
    </div>
  );
};

export default Cart;

// Helper function to calculate the total price
function calculateTotal(cartItems) {
  return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
}
