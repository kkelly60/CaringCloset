// AllProducts.js

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; // Import Link from React Router
import "./AllProducts.css";

const AllProducts = () => {
  const [allProducts, setAllProducts] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5542/get-image");
        setAllProducts(response.data.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <h1>All Products</h1>
      <div className="products">
        {allProducts &&
          allProducts.map((product, index) => (
            <div key={index} className="product">
              <Link to={`/product/${product._id}`}>
                <img src={require(`../../images/${product.image}`)} alt={product.description} />
              </Link>
              <div className="product-details">
                <p>{product.description}</p>
                <p>Age: {product.age}</p>
                <p>Color: {product.color}</p>
                <p>Gender: {product.gender}</p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default AllProducts;

