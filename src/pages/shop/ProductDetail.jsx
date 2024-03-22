import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ProductDetail = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get("http://localhost:5542/get-product/${productId}");
        if (response.data.status === "ok") {
          setProduct(response.data.data);
          setLoading(false);
        } else {
          setError(response.data.error);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching product:", error);
        setError("Internal server error");
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Product Detail</h1>
      {error ? (
        <p>{error}</p>
      ) : product ? (
        <div>
          <img src={require(`../../images/${product.image}`)} alt={product.description} />
          <div>
            <p>{product.description}</p>
            <p>Age: {product.age}</p>
            <p>Color: {product.color}</p>
            <p>Gender: {product.gender}</p>
          </div>
        </div>
      ) : (
        <p>No product found</p>
      )}
    </div>
  );
};

export default ProductDetail;
