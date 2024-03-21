import React from "react";
import { PRODUCTS } from "../../products";
import { Product } from "./product";

export const Girls = () => {
  return (
    <div className="shop">
      <div className="shopTitle">
        <h1>Girls</h1>
        <br/>
      </div>

      <div className="products">
        {PRODUCTS.map((product) => (
          <Product data={product} />
        ))}
      </div>
    </div>
  );
};