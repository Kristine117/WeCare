import React, { useContext } from "react";
import UserContext from "../../UserContext";
import SideMenu from "../../components/SideMenu/SideMenu";
// import DashboardContainer from "../../components/DashboardContainer/DashboardContainer";
import { Navigate, useLocation } from "react-router-dom";
import AppointmentForm from "../../components/AppointmentForm/AppointmentForm";
import wcdesign from "./Appointment.module.css";

const Appointment = () => {
  const { user } = useContext(UserContext);
  const location = useLocation();
  const { assistantId, fromFind } = location.state || {};

  console.log(assistantId);

  return (
    <main>
      {!user?.id && <Navigate to={"/login"} />}
      {user?.id && (
        <section className={wcdesign["dashboard"]}>
          <SideMenu />
          {fromFind ? (
            <AppointmentForm assistantId={assistantId} />
          ) : (
            <Navigate to="/appointment" />
          )}
        </section>
      )}
    </main>
  );
};

export default Appointment;
