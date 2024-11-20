import React, { useState } from "react";
import { NavLink,useNavigate } from "react-router-dom";
import navDesign from "./AppNavbar.module.css";

export default function AppNavbar() {
  const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate(); // Use useNavigate hook

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const scrollToAboutUs = () => {
    const aboutUsSection = document.getElementById("about-us");
    if (aboutUsSection) {
      aboutUsSection.scrollIntoView({ behavior: "smooth" });
    }
  };
  
  const handleSignInClick = () => {
    // Navigate to the login page and pass the state to scroll to About Us
    navigate("/login", { state: { scrollToAboutUs: true } });
  };

  const handleAboutUsClick = () => {
    // Navigate back to Home and pass the state to scroll to About Us
    navigate("/", { state: { scrollToAboutUs: true } });
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
      <a
          href="#"
          onClick={(e) => {
            e.preventDefault(); // Prevent default navigation behavior
            handleAboutUsClick(); // Call scroll to About Us
          }}
          className={`${navDesign.link} pr-4`}
        >
          About Us
        </a>
        <NavLink to="/login" className={`${navDesign.link} pr-4`} onClick={handleSignInClick}>
          Sign In
        </NavLink>

        {/* <NavLink to="/" className={`${navDesign.link} pr-4`}>
          About Us
        </NavLink> */}
        {/* <NavLink to="/login" className={`${navDesign.link} pr-4`}>
          Sign In
        </NavLink> */}
      </div>
    </nav>
  );
}
