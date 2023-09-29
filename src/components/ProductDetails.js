import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './css/ProductDetails.css'

const ProductDetails = ({ addToCart }) => {
  const history = useNavigate();
  const { productId } = useParams(); // Get the productId from the route

  const [product, setProduct] = useState(null);

  useEffect(() => {
    // Make a GET request to your API to fetch the product by productId
    axios.get(`https://fakestoreapi.com/products/${productId}`)
      .then((response) => {
        // Set the product data
        setProduct(response.data);
      })
      .catch((error) => {
        console.error('Error fetching product:', error);
      });
  }, [productId]); // Dependency on productId

  if (!product) {
    return <div>Loading...</div>; // Add a loading indicator
  }

  // Function to handle adding the product to the cart
  const handleAddToCart = () => {
    // Call the addToCart function to add the product to the cart in ProductList
    addToCart(product);

    // Navigate back to the previous page
    history(-1);
  };

  return (
    <div>
      <h2>{product.title}</h2>
      <img src={product.image} alt={product.title} className="product-image" />
      <p>Rating: {product.rating.rate} out of {product.rating.count} reviews</p>
      <p>Description: {product.description}</p>
      <p>Price: ${product.price}</p>
      {/* Add more product details here */}
      <button className="btn btn-primary" onClick={handleAddToCart}>
        Add to Cart
      </button>
    </div>
  );
};

export default ProductDetails;