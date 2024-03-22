import React, { useEffect, useState } from "react";
import axios from "axios";

const Girls = () => {
  const [girlsProducts, setGirlsProducts] = useState(null);

  useEffect(() => {
    const fetchGirlsProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5542/get-image");
        const girlsProductsData = response.data.data.filter(
          (product) => product.gender === "Girls"

        );
        setGirlsProducts(girlsProductsData);
      } catch (error) {
        console.error("Error fetching girls products:", error);
      }
    };

    fetchGirlsProducts();
  }, []);

  return (
    <div>
      <h1>Girls Products</h1>
      <div className="products">
        {girlsProducts === null ? (
          <p>Loading...</p>
        ) : girlsProducts.length === 0 ? (
          <p>No girls products available</p>
        ) : (
          girlsProducts.map((product, index) => (
            <div key={index} className="product">
              <img
                src={require(`../../images/${product.image}`)}
                height={100}
                width={100}
              />
              <p>{product.description}</p>
              <p>Age: {product.age}</p>
              <p>Color: {product.color}</p>
              <p>Gender: {product.gender}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Girls;
