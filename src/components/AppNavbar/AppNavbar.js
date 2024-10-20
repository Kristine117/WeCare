import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import navDesign from "./AppNavbar.module.css";

export default function AppNavbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className={navDesign.navbar}>
      <div className={navDesign.brandContainer}>
        <NavLink to="/" className={navDesign.link}>
        <img
          src="./wecare_logo.png"
          alt="We Care"
          width="100px"
          height="auto"
        />
        <h3 className={navDesign.fontWhite}>WeCare</h3>
         </NavLink>
      </div>
      <div className={navDesign.toggleButton} onClick={toggleNavbar}>
        {isOpen ?  "✖" : "☰"} {/* Simple icon toggle */}
      </div>
      <div className={`${navDesign.navLinks} ${isOpen ? navDesign.show : ""} pl-5 pt-3`}>
        <NavLink to="/" className={`${navDesign.link} pr-4`}>
          About Us
        </NavLink>
        <NavLink to="/" className={`${navDesign.link} pr-4`}>
          Find Care
        </NavLink>
        <NavLink to="/" className={`${navDesign.link} pr-4`}>
          Services
        </NavLink>
        <NavLink to="/login" className={`${navDesign.link} pr-4`}>
          Sign In
        </NavLink>
      </div>
    </nav>
  );
}
