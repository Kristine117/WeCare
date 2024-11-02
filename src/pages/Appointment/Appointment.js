import React, { useContext } from "react";
import UserContext from "../../UserContext";
import SideMenu from "../../components/SideMenu/SideMenu";
// import DashboardContainer from "../../components/DashboardContainer/DashboardContainer";
import { Navigate } from "react-router-dom";
import AppointmentForm from "../../components/AppointmentForm/AppointmentForm";
import wcdesign from "./Appointment.module.css";

const Appointment = () => {
  const { user } = useContext(UserContext);

  return (
    <main>
      {!user?.id && <Navigate to={"/login"} />}
      {user?.id && (
        <section className={wcdesign["dashboard"]}>
          <SideMenu />
          <AppointmentForm/>
        </section>
      )}
    </main>
  );
};

export default Appointment;
