import React from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, UserCircle } from "phosphor-react"; // Import the UserCircle icon
import "./navbar.css";

export const Navbar = () => {
  return (
    <div className="navbar">
      <div className="left-links">
        <Link to="/Boys"> Boys</Link>
        <Link to="/Girls"> Girls</Link>
      </div>

      <div className="links">
        <Link to="/"> Home </Link>
        <Link to="imageUpload"> Donate Now </Link>
        <Link to="signup"> Sign Up </Link>
        <Link to="login"> Log In </Link>
        <Link to="userDetails"> <UserCircle size={24} /> </Link> {/* Replace "User Details" with the UserCircle icon */}
        <Link to="/cart">
          <ShoppingCart size={32} />
        </Link>
      </div>
    </div>
  );
};


