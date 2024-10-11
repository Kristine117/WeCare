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
          <h3 className="font-weight-bold font-white">WeCare</h3>
        </div>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto pr-5">
          <Nav.Link as={NavLink} to="/about">
            <p className="font-white pr-4">About Us</p>
          </Nav.Link>
          <Nav.Link as={NavLink} to="/find-care">
            <p className="font-white pr-4">Find Care</p>
          </Nav.Link>
          <Nav.Link as={NavLink} to="/services">
            <p className="font-white pr-4">Services</p>
          </Nav.Link>
          <Nav.Link as={NavLink} to="/login">
            <p className="font-white">Sign In</p>
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
