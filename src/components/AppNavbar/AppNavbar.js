import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import navDesign from "./AppNavbar.module.css";

export default function AppNavbar() {
  return (
    <Navbar className={navDesign["navbar"]} expand="lg">
      <Navbar.Brand as={NavLink} to="/" className="mr-5">
        <div className="d-flex align-items-center">
          <img
            src="./wecare_logo.png"
            alt="We Care"
            width="100px"
            height="auto"
          />
          <h3 className="font-weight-bold font-white">WeCare</h3>
        </div>
      </Navbar.Brand>

      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav" className="d-flex align-items-center justify-content-end">
        <Nav className=" mr-5">
          <Nav.Link as={NavLink} to="/about" className="pr-4">
            <span className="font-white">About Us</span>
          </Nav.Link>
          <Nav.Link as={NavLink} to="/find-care" className="pr-4">
            <span className="font-white">Find Care</span>
          </Nav.Link>
          <Nav.Link as={NavLink} to="/services" className="pr-4">
            <span className="font-white">Services</span>
          </Nav.Link>
          <Nav.Link as={NavLink} to="/login">
            <span className="font-white">Sign In</span>
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
