import Navbar from "react-bootstrap/Navbar";
import { NavLink } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import React from "react";
import navDesign from "./AppNavbar.module.css";

export default function AppNavbar() {
  return (
    <Navbar className={navDesign["navbar"]}>
      <Navbar.Brand as={NavLink} to="/">
        <div className="d-flex align-items-center">
          <img
            src="./wecare_logo.png"
            alt="We Care"
            width="100px"
            height="auto"
          />
          <h1 className="font-weight-bold font-white">WeCare</h1>
        </div>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <Nav.Link as={NavLink} to="/about">
            <h5 className="font-white">About Us</h5>
          </Nav.Link>
          <Nav.Link as={NavLink} to="/find-care">
            <h5 className="font-white">Find Care</h5>
          </Nav.Link>
          <Nav.Link as={NavLink} to="/services">
            <h5 className="font-white">Services</h5>
          </Nav.Link>
          <Nav.Link as={NavLink} to="/login">
            <h5 className="font-white">Sign In</h5>
          </Nav.Link>
        </Nav>  
      </Navbar.Collapse>
    </Navbar>
  );
}
