import React, { useRef, useState } from "react";
import { useNavigate, NavLink, Navigate } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import AppNavbar from "./AppNavbar";

export default function SideMenu({
  activeFind,
  activeHome,
  activeMessage,
  activeAppointment,
}) {
  const modalRef = useRef(null); // Reference for the modal element
  const navigate = useNavigate(); // React Router's navigation hook
  const [activeNavHome, setactiveNavHome] = useState(activeHome);
  const [activeNavFind, setActiveNavFind] = useState(activeFind);
  const [activeNavMes, setActiveNavMes] = useState(activeMessage);
  const [activeNavApp, setActiveNavApp] = useState(activeAppointment);
  const [activeNavSupp, setActiveNavSupp] = useState(false);

  const clickedActiveHome = () => {
    navigate("/dashboard-senior");
  };

  const clickedActiveFind = () => {
    <AppNavbar activeHead={true} />;
    navigate("/dashboard-senior/find");
  };

  const clickedActiveMess = () => {
    navigate("/dashboard-senior/message");
  };

  const clickedActiveApp = () => {
    navigate("/dashboard-senior/appointment");
  };

  const clickedActiveSupp = () => {
    setactiveNavHome(false);
    setActiveNavFind(false);
    setActiveNavMes(false);
    setActiveNavSupp(true);
    setActiveNavApp(false);
  };

  const handleLogout = () => {
    navigate("/logout");
  };
  return (
    <>
      {/* Sidebar */}
      <div className="sidebar open">
        <div className="logo my-4 text-center">
          <img src="../wecare_logo.png" alt="WeCare" width="100" />
        </div>

        <div className="menu-items flex-grow-1 d-flex flex-column ml-4 mr-4">
          <div
            onClick={clickedActiveHome}
            className={
              activeNavHome ? "menu-item my-3 actives" : "menu-item my-3"
            }
          >
            <span className="material-symbols-outlined side-menu-color icon-size ">
              home
            </span>
            <p className="ml-2">Home</p>
          </div>
          <div
            onClick={clickedActiveFind}
            className={
              activeNavFind ? "menu-item my-3 actives" : "menu-item my-3"
            }
          >
            <span className="material-symbols-outlined side-menu-color icon-size">
              search
            </span>
            <p className="ml-2">Find</p>
          </div>
          <div
            onClick={clickedActiveMess}
            className={
              activeNavMes ? "menu-item my-3 actives" : "menu-item my-3"
            }
          >
            <span className="material-symbols-outlined side-menu-color icon-size">
              chat
            </span>
            <p className="ml-2">Message</p>
          </div>

          <div
            onClick={clickedActiveApp}
            className={
              activeNavApp ? "menu-item my-3 actives" : "menu-item my-3"
            }
          >
            <span class="material-symbols-outlined side-menu-color icon-size">
              list_alt
            </span>
            <p className="ml-2">Appointment</p>
          </div>
        </div>

        <div className="support-item mb-4 ml-4 mr-4">
          <div
            onClick={clickedActiveSupp}
            className={
              activeNavSupp ? "menu-item my-3 actives" : "menu-item my-3"
            }
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
        tabindex="-1"
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
