import React from "react";
import Logo from "../assets/Caring.png";
import { Link } from "react-router-dom";
import { ShoppingCart } from "phosphor-react";
import "./navbar.css";

export const Navbar = () => {
  return (
    <div className="navbar">
      <img src={Logo} className="logo-image" alt="Caring Logo" />
      <div className="links">
        <Link to="/"> Home </Link>
        <Link to="signup"> Sign Up </Link>
        <Link to="login"> Log In </Link>
        <Link to="userDetails"> User Details </Link>
        <Link to="imageUpload"> Donate Now </Link>
        <Link to="AllProducts"> AllProducts </Link>
        <Link to="/Boys"> Boys</Link>
        <Link to="/Girls"> Girls</Link>
        <Link to="/cart">
          <ShoppingCart size={32} />
        </Link>
      </div>
    </div>
  );
};
