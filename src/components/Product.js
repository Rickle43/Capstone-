import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Product = ({ product, addToCart }) => {
  const [isAddedToCart, setIsAddedToCart] = useState(false);

  const handleAddToCart = () => {
    addToCart(product);
    setIsAddedToCart(true);

    setTimeout(() => {
      setIsAddedToCart(false); // Reset button state after 2 seconds
    }, 2000);
  };

  return (
    <div className="product-card">
      <div className="product-image">
        <Link to={`/product/${product.id}`}>
          <img
            src={product.image}
            alt={product.title}
            className="product-image"
          />
        </Link>
      </div>
      <h5 className="product-title">
        <Link to={`/product/${product.id}`}>{product.title}</Link>
      </h5>
      <div className="product-price">
        <p>Price: ${product.price}</p>
      </div>
      <div className="add-to-cart-button">
        {!isAddedToCart ? (
          <button className="btn btn-primary" onClick={handleAddToCart}>
            Add to Cart
          </button>
        ) : (
          <p>Added to Cart</p>
        )}
      </div>
    </div>
  );
};

export default Product;
