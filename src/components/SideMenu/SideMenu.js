import React, { useRef, useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

import AppNavbar from "../AppNavbar/AppNavbar";
import sidemenu from "./SideMenu.module.css";

export default function SideMenu() {
  const modalRef = useRef(null); // Reference for the modal element
  const navigate = useNavigate(); // React Router's navigation hook
  const location = useLocation(); // Hook to get the current location

  // State to determine which nav item is active
  const [activeNavHome, setActiveNavHome] = useState(false);
  const [activeNavFind, setActiveNavFind] = useState(false);
  const [activeNavMes, setActiveNavMes] = useState(false);
  const [activeNavApp, setActiveNavApp] = useState(false);
  //const [activeNavSupp, setActiveNavSupp] = useState(false);

  // Update active states based on current location
  useEffect(() => {
    setActiveNavHome(location.pathname === '/dashboard-main');
    setActiveNavFind(location.pathname === '/find');
    setActiveNavMes(location.pathname === '/chatlist');
    setActiveNavApp(location.pathname === '/appointment');
    //setActiveNavSupp(location.pathname === '/support'); // Update as per your support route
  }, [location.pathname]);

  const clickedActiveHome = () => {
    navigate("/dashboard-main");
  };

  const clickedActiveFind = () => {
    navigate("/find");
  };

  const clickedActiveMess = () => {
    navigate("/chatlist");
  };

  const clickedActiveApp = () => {
    navigate("/appointment");
  };

  // const clickedActiveSupp = () => {
  //   navigate("/support"); // Navigate to support route if needed
  // };

  const handleLogout = () => {
    navigate("/logout");
  };

  return (
    <>
      {/* Sidebar */}
      <div className={sidemenu["sidebar"]}>
        <div className="logo my-4 text-center">
          <img src="../wecare_logo.png" alt="WeCare" width="100" />
        </div>

        <div className="menu-items flex-grow-1 d-flex flex-column ml-4 mr-4">
          <Link to={'/dashboard-main'}
            onClick={clickedActiveHome}
            className={activeNavHome ? "menu-item actives" : "menu-item"}
          >
            <span className="material-symbols-outlined side-menu-color icon-size ">
              home
            </span>
            <p className="ml-2 pt-3">Home</p>
          </Link>
          <Link
            to={"/find"}
            onClick={clickedActiveFind}
            className={activeNavFind ? "menu-item actives" : "menu-item"}
          >
            <span className="material-symbols-outlined side-menu-color icon-size">
              search
            </span>
            <p className="ml-2 pt-3">Find</p>
          </Link>
          <Link
            to={"/chatlist"}
            onClick={clickedActiveMess}
            className={activeNavMes ? "menu-item actives" : "menu-item"}
          >
            <span className="material-symbols-outlined side-menu-color icon-size">
              chat
            </span>
            <p className="ml-2 pt-3">Message</p>
          </Link>

          <Link
            to="/appointment"
            onClick={clickedActiveApp}
            className={activeNavApp ? "menu-item actives" : "menu-item"}
          >
            <span className="material-symbols-outlined side-menu-color icon-size">
              list_alt
            </span>
            <p className="ml-2 pt-3">Appointment</p>
          </Link>
        </div>

        <div className="support-item mb-4 ml-4 mr-4">
          <div
            // onClick={clickedActiveSupp}
            //className={activeNavSupp ? "menu-item my-3 actives" : "menu-item"}
          >
            <span className="material-symbols-outlined side-menu-color icon-size">
              volunteer_activism
            </span>
            <p>Support</p>
          </div>
        </div>

        <div className="support-item logout-bottom mb-4 ml-4">
          <span className="material-symbols-outlined side-menu-color icon-size">
            logout
          </span>
          <button
            type="button"
            className="button-logout"
            data-toggle="modal"
            data-target="#exampleModal"
          >
            Log-Out
          </button>
        </div>
      </div>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Are you sure you Log-Out?
              </h5>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn button-modal-logout"
                onClick={handleLogout}
                data-dismiss="modal"
              >
                Yes
              </button>

              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                No
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
