import React, { useContext } from "react";
import UserContext from "../../UserContext";
import SideMenu from "../../components/SideMenu/SideMenu";
import DashboardContainer from "../../components/DashboardContainer/DashboardContainer";
import { Navigate, useLocation } from "react-router-dom";
import AppointmentForm from "../../components/AppointmentForm/AppointmentForm";
import wcdesign from "./Appointment.module.css";

const Appointment = () => {
  const { user } = useContext(UserContext);
  const location = useLocation();
  const { assistantId, fullName } = location.state;

  console.log(assistantId);

  return (
    <main>
      {/*  {!user?.id && <Navigate to={"/login"} />} */}
      {user?.id && (
        <section className={wcdesign["dashboard"]}>
          <SideMenu />
          <AppointmentForm assistantId={assistantId} fullName={fullName} />
        </section>
      )}
    </main>
  );
};

export default Appointment;
