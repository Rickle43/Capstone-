import React, { useState, useEffect } from 'react';
import './css/ProductList.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ProductList = ({
  addToCart,
  categoryFilter,
  priceRangeFilter,
}) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]); // Declare filteredProducts here

  useEffect(() => {
    axios
      .get('https://fakestoreapi.com/products')
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
      });
  }, []);

  const priceRanges = [
    { label: '0 - 25', min: 0, max: 25 },
    { label: '25 - 50', min: 25, max: 50 },
    { label: '50 - 100', min: 50, max: 100 },
    { label: '100+', min: 100, max: Infinity },
  ];

  useEffect(() => {
    const updatedFilteredProducts = products.filter((product) => {
      if (categoryFilter && product.category !== categoryFilter) {
        return false;
      }

      if (priceRangeFilter) {
        const selectedRange = priceRanges.find((range) => range.label === priceRangeFilter);
        if (!selectedRange) {
          return false;
        }

        const productPrice = parseFloat(product.price);

        if (
          isNaN(productPrice) ||
          productPrice < selectedRange.min ||
          productPrice > selectedRange.max
        ) {
          return false;
        }
      }

      return true;
    });

    setFilteredProducts(updatedFilteredProducts); // Update filteredProducts state here
  }, [categoryFilter, priceRangeFilter, products]);

  // Generate HTML markup for products
  const productHTML = filteredProducts.map((product) => (
    <div key={product.id} className="col mb-5">
      <div className="card h-100">
        {/* Product image */}
        <Link to={`/product/${product.id}`} className="card-img-top">
          <img src={product.image} alt={product.title} className="card-img-top" />
        </Link>
        {/* Product details */}
        <div className="card-body p-4">
          <div className="text-center">
            {/* Product name */}
            <h5 className="fw-bolder">{product.title}</h5>
            {/* Product price */}
            {`$${product.price}`}
          </div>
        </div>
        {/* Product actions */}
        <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
          <div className="text-center">
            {/* Add to cart button */}
            <button
              className="btn btn-outline-dark mt-auto"
              onClick={() => addToCart(product)}
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </div>
  ));

  return (
    <div>
      <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
        {productHTML}
      </div>
    </div>
  );
};

export default ProductList;
